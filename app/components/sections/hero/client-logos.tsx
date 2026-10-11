import Image from "next/image";

import { clientLogos, type ClientLogo } from "@/app/lib/site-config";

import { MonoLabel } from "../../ui/primitives";
import styles from "./client-logos.module.css";

/** "Clients & partners" row. Hidden until `clientLogos` has entries. */
export function ClientLogos() {
  if (clientLogos.length === 0) return null;

  return (
    <div className={styles.row}>
      <MonoLabel>Clients &amp; partners</MonoLabel>
      <ul className={styles.grid}>
        {clientLogos.map((client, index) => (
          <li key={`${client.name}-${index}`} className={styles.slot} data-placeholder={!client.logo || undefined}>
            <LogoContent client={client} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function LogoContent({ client }: { client: ClientLogo }) {
  // Without a logo file the slot shows the name, in the design's placeholder style.
  const content = client.logo ? (
    <Image src={client.logo} alt={client.name} width={160} height={28} className={styles.logo} />
  ) : (
    client.name
  );

  return client.href ? (
    <a href={client.href} className={styles.link}>
      {content}
    </a>
  ) : (
    content
  );
}
