
import { forwardRef, useState } from "react";

import DataImages from "~/utils/DataImages";

const Image = forwardRef(({ style, src, alt, ...props }, ref) => {

    const [fallBack, setFallBack] = useState("");

    const handleError = () => {
        setFallBack(
            DataImages.noImage
        )
    }

    return ( 
        <img 
            style={{ overflow: "hidden", cursor: 'pointer', ...style }}
            // className={classNames(styles.wrapper, className)} 
            src={fallBack || src} 
            ref={ref} 
            {...props} 
            alt={alt} 
            onError={handleError} 
        />
     );
});

export default Image;