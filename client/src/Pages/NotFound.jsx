import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col gap-4 items-center justify-center">
      <p className="text-5xl font-medium">404</p>
      <p className="text-3xl ">
        The page you are looking for is not availabe right now.
      </p>
      <NavLink to="/">
        <p className="text-lg text-blue-500 underline">Go To Homepage</p>
      </NavLink>
    </main>
  );
}
