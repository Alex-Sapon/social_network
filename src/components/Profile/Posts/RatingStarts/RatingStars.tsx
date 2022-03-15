import React, {FC, useState} from 'react';
import { Rating } from '@mui/material';

type RatingStarsType = {
    stars: number
}

const RatingStars: FC<RatingStarsType> = ({stars}) => {
    const [value, setValue] = useState<number | null>(stars)

    const onChangeHandler = (event: React.SyntheticEvent, newValue: number | null) => {
        setValue(newValue)
    }

    return (
        <Rating value={value} onChange={onChangeHandler}/>
    )
}

export default RatingStars;