#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <Firebase.h>
#import <GoogleMaps/GoogleMaps.h>
#import <RNCPushNotificationIOS.h>  // For Push Notifications

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Set up module name and initial props
  self.moduleName = @"PhotoApp";
  self.initialProps = @{};

  // Firebase configuration
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }

  // Google Maps configuration
  [GMSServices provideAPIKey:@"AIzaSyDjNvasscsnc1uuWAegRcu6fpd01p8iL9c"];

  // Register for remote notifications
  [application registerForRemoteNotifications];

  // Call the super class implementation
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

// For handling remote notifications when the app is in the background or killed
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
  fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

// Source URL for the React Native bridge
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
