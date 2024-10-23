import { ImgHTMLAttributes } from "react";


export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img 
            {...props}
            src="http://localhost:8000/images/Logo-line.png" 
            alt="LogoLine" 
        />
    );
}
