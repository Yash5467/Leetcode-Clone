import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo, useMemo } from 'react'

function Button({content,bg,textBg,icon}) {
  return (
	<button  className={`bg-${bg} py-1.5 px-3 flex gap-2 text-center cursor-pointer rounded text-${textBg}`} >
			{content} { icon && <span><FontAwesomeIcon color={textBg} icon={icon} /> </span>}
		</button>
  )
}

export default Button