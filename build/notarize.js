// const { notarize } = require("@electron/notarize");
// const path = require("path");

// exports.default = async function notarizeApp(context) {
//   const { electronPlatformName, appOutDir } = context;

//   if (electronPlatformName !== "darwin") {
//     return;
//   }

//   const appName = context.packager.appInfo.productFilename;

//   console.log(`🔐 Notarizing ${appName} with notarytool...`);

//   await notarize({
//     appBundleId: "com.aroopaapps.desktop.apps",
//     appPath: `${appOutDir}/${appName}.app`,
//     tool: "notarytool",
//     appleApiKey: path.resolve(process.env.APPLE_API_KEY_PATH),
//     appleApiKeyId: process.env.APPLE_API_KEY_ID,
//     appleApiIssuer: process.env.APPLE_API_ISSUER_ID,
//   });

//   console.log(`✅ Notarization request sent for ${appName}`);
// };

// const { notarize } = require("@electron/notarize");

// exports.default = async function notarizing(context) {
//   const { electronPlatformName, appOutDir } = context;
//   if (electronPlatformName !== "darwin") return;

//   const appName = context.packager.appInfo.productFilename;

//   return await notarize({
//     appBundleId: "com.aroopa.apps",
//     appPath: `${appOutDir}/${appName}.app`,
//     appleId: process.env.APPLE_ID,
//     appleIdPassword: process.env.APPLE_ID_PASSWORD,
//     teamId: "J254VTF3G4",
//   });
// };

const { notarize } = require("@electron/notarize");

exports.default = async function notarizeApp(context) {
  const { electronPlatformName, appOutDir } = context;

  if (electronPlatformName !== "darwin") {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  console.log(
    `🔐 Notarizing ${appName} with notarytool using keychain profile...`
  );

  await notarize({
    appBundleId: "com.aroopaapps.desktop.apps",
    appPath: `${appOutDir}/${appName}.app`,
    tool: "notarytool",
    keychainProfile: "aroopa-creds", // ✅ use the stored profile
  });

  console.log(`✅ Notarization request sent for ${appName}`);
};
