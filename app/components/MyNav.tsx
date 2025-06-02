import Link from "next/link";

function MyNav() {
  return (
    <nav>
      <Link href="/dashboard">Dashboard Overview</Link>
      <Link href="/dashboard/settings">Settings</Link>
      <Link href="/dashboard/reports">Reports</Link>
    </nav>
  );
}
export default MyNav;
