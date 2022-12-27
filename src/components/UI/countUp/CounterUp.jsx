import React from 'react';
import CountUp from "react-countup";
import {useState} from "react";
import VisibilitySensor from "react-visibility-sensor";

const CounterUp = ({className, ...rest}) => {
        const [viewPortEntered, setViewPortEntered] = useState(false);

        return (
            <CountUp {...rest} start={viewPortEntered ? null : 0}>
                {({countUpRef}) => {
                    // noinspection JSValidateTypes
                    return (
                        <VisibilitySensor
                            active={!viewPortEntered}
                            onChange={(isVisible) => {
                                if (isVisible) {
                                    setViewPortEntered(true);
                                }
                            }}
                            delayedCall
                        >
                            <span className={className} ref={countUpRef}/>
                        </VisibilitySensor>
                    );
                }}
            </CountUp>
        );
    }
;
export default CounterUp;