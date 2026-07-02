import type { Service } from "@/entities/service";
import { ServiceIcon } from "@/entities/service";
import { Reveal } from "@/shared/components/effects/Reveal";
import styles from "./services.module.css";

interface ServiceRowProps {
  readonly service: Service;
}

/**
 * Single service row.
 * Each row is a server component that wraps content in a `Reveal`
 * so it animates in as it enters the viewport.
 */
export function ServiceRow({ service }: ServiceRowProps): JSX.Element {
  const Icon = service.icon;

  return (
    <article className={styles.row} aria-labelledby={`service-${service.id}`}>
      <div className={styles.index}>{service.index}</div>

      <div className={styles.body}>
        <Reveal y={16} duration={0.6}>
          <ServiceIcon icon={Icon} />
        </Reveal>

        <Reveal delay={0.05}>
          <h3 id={`service-${service.id}`} className={styles.title}>
            {service.title}
          </h3>
          <p className={styles.tagline}>{service.tagline}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className={styles.description}>{service.description}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className={styles.capabilities} aria-label={`${service.title} capabilities`}>
            {service.capabilities.map((cap) => (
              <li key={cap} className={styles.chip}>
                {cap}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </article>
  );
}