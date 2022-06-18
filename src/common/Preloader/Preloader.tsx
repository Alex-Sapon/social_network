import {FC} from 'react';
import preloader from '../../assets/img/preloader/preloader.svg';
import styles from './Preloader.module.css';

type PreloaderType = {
    className?: string
    stylePreloader?: string
}

export const Preloader: FC<PreloaderType> = ({className, stylePreloader}) => {
    return (
        <div className={`${styles.preloader_wrapper} ${className}`}>
            <img src={preloader} alt="Preloader" className={stylePreloader}/>
        </div>
    )
};