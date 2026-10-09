import { Footer } from "@/app/components/layout/footer";
import { Navbar } from "@/app/components/layout/navbar";

import styles from "./layout.module.css";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
