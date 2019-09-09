//
//  GetCertificateCode.m
//  zzunda
//
//  Created by 유건 on 04/09/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(GetCertificateCode, NSObject)
RCT_EXTERN_METHOD(getCodeForCertificateImport: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(importCertificate: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getCertificateList: (RCTResponseSenderBlock)callback)
@end
