# Life OS for iPhone (native shell)

A small native app that shows the Life OS web app and adds what a web app on iPhone can't do:
local notifications now, Live Activities and widgets next. Free Apple ID, no paid developer account.

## What phase 1 does
- Opens Life OS full screen (same pages, same features).
- Rest timer, mobility step or gym timer done: a notification, even with the phone locked.
- Focus flight landed: a notification.
- App links (WhatsApp, Gmail, Calendar) and other websites open outside the app.

## One-time setup on the Mac
1. Install **Xcode** from the Mac App Store (free, large download).
2. Open Xcode once, accept the licence, and let it install the iOS components.
3. In Terminal:
   ```bash
   sudo xcode-select -s /Applications/Xcode.app
   ```
4. Install XcodeGen (makes the Xcode project from `project.yml`):
   ```bash
   brew install xcodegen
   ```
5. Generate and open the project:
   ```bash
   cd ~/Desktop/Life-OS/ios && xcodegen && open LifeOS.xcodeproj
   ```
6. In Xcode: Settings › Accounts › add your Apple ID. Then click the LifeOS target › Signing & Capabilities › Team: your name (Personal Team). If the bundle id is taken, change `com.jroque.lifeos` to something unique.

## Put it on the iPhone
1. Plug in the iPhone, unlock it, tap Trust.
2. iPhone: Settings › Privacy & Security › Developer Mode › on (it restarts).
3. In Xcode pick your iPhone at the top and press Run.
4. iPhone: Settings › General › VPN & Device Management › trust your Apple ID.
5. Open Life OS, allow notifications.

## Move your data (once)
The native app keeps its own storage. In the home-screen web app: More › Settings › export a backup. In the native app: import it.

## Keep it running past 7 days: SideStore
Free signing expires every 7 days. SideStore renews it on the phone.
1. Follow the install guide at sidestore.io (it uses a small Mac helper once to pair the phone).
2. Export the app from Xcode (Product › Archive › Distribute › Development, or build the `.ipa`) and open it in SideStore.
3. SideStore refreshes it in the background over its on-device VPN. Open SideStore now and then.

The app plus a widget extension counts as 2 of the 3 free app slots.

## Next phases
2. Live Activities: rest timer, focus flight with progress, current mobility step.
3. Widgets: today (focus hours, steps, water, kcal, next event) and a one-tap flight starter.
