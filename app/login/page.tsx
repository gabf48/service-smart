// "use client";

// import { useEffect, useState } from "react";
// import { LoginCard } from "./_components/LoginCard";
// import { LoginForm } from "./_components/LoginForm";
// import { useLoginForm } from "./_hooks/useLoginForm";

// export default function LoginPage() {
//   const {
//     email,
//     setEmail,
//     password,
//     setPassword,
//     loading,
//     errorMsg,
//     forgotMsg,
//     forgotError,
//     handleLogin,
//     handleForgotPassword,
//   } = useLoginForm();

//   const [hydrated, setHydrated] = useState(false);

//   useEffect(() => {
//     setHydrated(true);
//   }, []);

//   return (
//     <div
//       className="space-bg flex h-dvh items-center justify-center overflow-hidden p-6"
//       data-testid="login-page"
//     >
//       <LoginCard>
//         <LoginForm
//           email={email}
//           setEmail={setEmail}
//           password={password}
//           setPassword={setPassword}
//           loading={loading}
//           errorMsg={errorMsg}
//           forgotMsg={forgotMsg}
//           forgotError={forgotError}
//           onSubmit={handleLogin}
//           onForgotPassword={handleForgotPassword}
//           hydrated={hydrated}
//         />
//       </LoginCard>
//     </div>
//   );
// }


import { redirect } from "next/navigation";

export default function LoginPage() {
  redirect("/");
}