//
//  GetCertificateCode.swift
//  zzunda
//
//  Created by 유건 on 04/09/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

@objc(GetCertificateCode)
class GetCertificateCode: NSObject {
  
  var icrp: ICRProtocol?
  var certManager: CertManager?
  
  @objc
  func getCodeForCertificateImport(_ callback: @escaping RCTResponseSenderBlock){
    
    var importCode: String = "";
    
    DispatchQueue.background(background: {
      self.icrp = ICRProtocol.init(ip: "210.207.195.142", port: 10500, siteCode: "00001");
      let result: Int32 = self.icrp?.import1() ?? -1;
      if (result < 0) {
      } else {
        guard let code: String = self.icrp?.generatedNumber
          else {
            return;
        }
        importCode = code;
      }
    }, completion: {
      callback([importCode])
    });
  }
  
  @objc
  func importCertificate(_ callback: @escaping RCTResponseSenderBlock){
    // certManager assign!
    self.certManager = CertManager();
    if self.icrp == nil {
      callback([["result": false, "message": "ICRP_NOT_INITIALIZED"]])
    }
    
    let result: Int32 = self.icrp?.import2() ?? -1;
    if result == -1 {
      callback([["result": false, "message": "IMPORT_ERROR"]])
    } else if result == 1 {
      let certData = icrp?.certData;
      let keyData = icrp?.keyData;
      
      let saveResult: Bool = self.certManager?.saveCert(toKeyChain: certData, key: keyData) ?? false;
      
      if (saveResult) {
        callback([["result": true, "message": "SUCCESS"]])
      } else {
        callback([["result": false, "message": "SAVE_ERROR"]])
      }
    }
  }
  
  @objc
  func getCertificateList(_ callback: @escaping RCTResponseSenderBlock) {
    if self.certManager == nil {
      callback([[]])
    }
    
    let count = Int(self.certManager?.count() ?? 0);
    if count == 0 {
      callback([])
    }
    var certList: [Any] = [];
    
    for i in 0...(count-1) {
      let certificate = self.certManager?.getCert(Int32(i));
      
      let subjectName = certificate?.getSubjectName();
      let issuerName = certificate?.getIssuerName();
      let policy = certificate?.getPolicy();
      let dn = certificate?.getSubject();
      let expiarationDate = certificate?.getValidTo();
      
      var jsonObject: [String: Any] = [:];
      jsonObject["SUBJECT_NAME"] = subjectName;
      jsonObject["ISSUER_NAME"] = issuerName;
      jsonObject["POLICY"] = policy;
      jsonObject["DN"] = dn;
      jsonObject["EXPIRATION_DATE"] = expiarationDate;
      certList.append(jsonObject);
    }
    
    do {
      let jsonData = try JSONSerialization.data(withJSONObject: certList);
      let jsonString: String = String.init(data: jsonData, encoding: String.Encoding.utf8) ?? "[]";
      callback([jsonString])
    } catch {
      callback([])
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

}

extension DispatchQueue {
  static func background(delay: Double = 0.0, background: (()->Void)? = nil, completion: (() -> Void)? = nil) {
    DispatchQueue.global(qos: .background).async {
      background?()
      if let completion = completion {
        DispatchQueue.main.asyncAfter(deadline: .now() + delay, execute: {
          completion()
        })
      }
    }
  }
}
