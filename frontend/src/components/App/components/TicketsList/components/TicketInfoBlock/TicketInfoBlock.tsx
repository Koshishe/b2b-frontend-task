import s from './TicketInfoBlock.module.scss';

interface TicketInfoBlockProps {
  title: string;
  description?: string;
}

export const TicketInfoBlock = ({
  title,
  description,
}: TicketInfoBlockProps) => (
  <div>
    <div className={s.title}>{title}</div>
    {description && <div className={s.description}>{description}</div>}
  </div>
);
