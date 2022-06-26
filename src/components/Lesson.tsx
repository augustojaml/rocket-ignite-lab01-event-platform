import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { CheckCircle, Lock } from 'phosphor-react';
import { Link, useParams } from 'react-router-dom';
import classnames from 'classnames';

interface LessonProps {
  title: string;
  slug: string;
  type: 'live' | 'class';
  availableAt: Date;
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR,
  });

  const isActiveLesson = slug === props.slug;

  //rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500

  return (
    <>
      <Link to={`/event/lesson/${props.slug}`} className="group">
        <span className="text-gray-300">{availableDateFormatted}</span>
        <div
          className={classnames(
            'rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 relative',
            {
              'bg-green-500': isActiveLesson,
            }
          )}
        >
          <header className="flex items-center justify-between">
            {isLessonAvailable ? (
              <span
                className={classnames('text-sm text-blue-500 font-medium flex items-center gap-2', {
                  'text-white': isActiveLesson,
                })}
              >
                <CheckCircle size={20} />
                Conteúdo liberado
              </span>
            ) : (
              <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                <Lock size={20} />
                Em Breve
              </span>
            )}
            <span
              className={classnames(
                'text-xs font-bold rounded py-[0.125rem] px-2 text-white border border-green-300',
                {
                  'border-white': isActiveLesson,
                }
              )}
            >
              {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
            </span>
          </header>
          <strong
            className={classnames('text-gray-300 mt-5 block', {
              'text-white': isActiveLesson,
            })}
          >
            {props.title}
          </strong>
          {isActiveLesson && (
            <span className="bg-green-500 w-[13px] h-[13px] absolute top-1/2 left-[-8px] -translate-y-1/2 rotate-45" />
          )}
        </div>
      </Link>
    </>
  );
}
