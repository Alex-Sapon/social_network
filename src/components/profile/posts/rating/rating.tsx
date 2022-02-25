import React, {FC} from 'react';
interface StarsPropsType {
    stars: number
}

const Rating: FC<StarsPropsType> = ({stars}) => {
    if (stars === 3) {
        return (
            <div>
                <span>Rating </span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
            </div>
        )
    } else if (stars === 4) {
        return (
            <div>
                <span>Rating </span>
                <span>&#9733;</span>
                <span>&#9733;</span>
            </div>
        )
    } else if (stars === 5) {
        return (
            <div>
                <span>Rating </span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
            </div>
        )
    } else if (stars === 1) {
        return (
            <div>
                <span>Rating </span>
                <span>&#9733;</span>
            </div>
        )
    }
    return (
        <div>
            <span>Rating </span>
            <span>0</span>
        </div>
    )
}

export default Rating;