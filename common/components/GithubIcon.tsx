import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import clsx from "clsx";

type Props = {
  width?: number
  className?: string
  user?: string
  repo: string
}

export const GithubIcon = (props: Props) => {
  const {width = 36, className, repo, user = 'XDean'} = props
  return (
    <a className={clsx('leading-[0px] hover:ring-2 rounded-full', className)}
       target={'_blank'}
       href={`https://github.com/${user}/${repo}`}
    >
      <FontAwesomeIcon icon={faGithub}
                       style={{fontSize: width}}/>
    </a>
  )
}