# PMM — Task Manager App

Ky është një aplikacion **React Native (Expo)** për menaxhimin e detyrave personale me autentifikim përmes **Firebase** dhe **GitHub**.
Qëllimi i projektit është të demonstrojë si mund të integrohet **Firebase Authentication** me ofrues të jashtëm (OAuth) dhe të përdoret **expo-router** për navigim brenda aplikacionit.

## Karakteristikat
- Autentifikim me **email/password** dhe **GitHub OAuth**
- Shtim, ndryshim dhe fshirje e detyrave
- Profil përdoruesi me të dhëna bazë
- Navigim me **expo-router**
- Integrim me **Firebase** për login dhe ruajtje të të dhënave

## Instalimi
```bash
git clone https://github.com/amatraci/MobileApp.git
cd MobileApp/week-3-1b
npm install
npx expo start
```

## Konfigurimi i Firebase
1. Krijo një projekt në [Firebase Console](https://console.firebase.google.com/).
2. Shto kredencialet e projektit në `firebase.js`.
3. Aktivizo **GitHub Provider** në *Authentication → Sign-in method*.
4. Në [GitHub Developer Settings → OAuth Apps](https://github.com/settings/developers), krijo një **New OAuth App** dhe vendos:
   - Homepage URL: `https://<project-id>.firebaseapp.com`
   - Authorization callback URL: `https://<project-id>.firebaseapp.com/__/auth/handler`
5. Kopjo **Client ID** dhe **Client Secret** dhe vendosi në Firebase.
6. Shto `localhost` te **Authorized Domains** në Firebase për testim lokal.

## Login me GitHub
**firebase.js:**
```js
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
const provider = new GithubAuthProvider();
export const signInWithGitHub = () => signInWithPopup(auth, provider);
```

**login.jsx:**
```jsx
<TouchableOpacity onPress={handleGitHubLogin}>
  <Text>Sign in with GitHub</Text>
</TouchableOpacity>
```

## Zgjidhje për gabimin “Faqja nuk u gjet”
Nëse pas login-it me GitHub del faqja “Faqja nuk u gjet”, ndrysho linjën në `login.jsx` nga:
```js
router.replace("/");
```
në:
```js
router.replace("/(tabs)");
```
Kjo është rruga korrekte për faqen kryesore që ndodhet brenda `(tabs)/index.jsx`.

## Teknologjitë e përdorura
- React Native (Expo)
- Firebase Authentication
- GitHub OAuth
- React Hooks
- Expo Router

## Autor
Amat Raçi — zhvillues i aplikacionit
Licencuar nën UP FIEK.
