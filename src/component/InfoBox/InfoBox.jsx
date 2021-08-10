import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import "./infobox.scss"

const InfoBox = ({title, cases, total, active, isRed, isBlack, isGreen, ...props}) => {  //...props to handle onclick
    // console.log(cases)
    return (
        <Card 
            className={`infoBox ${active && 'infoBox-selected'} ${isRed && 'infoBox-red'} ${isBlack && 'infoBox-black'}`}
            onClick={props.onClick}
            >
            <CardContent>
                {/* Title */}
                <Typography className="infoBox_title" color="textSecondary">
                    {title}
                </Typography>
                {/* Number of cases */}
                <h2 className={`'infoBox_cases' ${active && 'info-selected'} ${isRed && 'info-red'} ${isGreen && 'info-green'} ${isBlack && 'info-black'}`}>{cases}</h2>
                {/* Total */}
                <Typography className="infoBox_total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
