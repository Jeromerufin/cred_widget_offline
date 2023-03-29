import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

import { CircularCredScoreProgressBar } from "./CircularCredScoreProgressBar";
import { Card } from "../../common/components/Card";


export const CredScoreTopSection = ({ credScoreData, loading, address }) => {
    const minValue = 300;
    const maxValue = 1000;
    const ANIMATION_DURATION = 1000; // in order to match the duration for cred score circular progress & Cred History Chart

    // to avoid duplication of toast
    const hasToastRendered = useRef();

    useEffect(() => {
        // toast to notify if no cred score
        if (
            address &&
            credScoreData?.value === null &&
            !hasToastRendered.current
        ) {
            hasToastRendered.current = true;
            toast("No cred score found", {
                icon: "ⓘ",
                duration: 1600,
            });
        } else {
            hasToastRendered.current = false;
        }
    }, [address, credScoreData]);

    return (
        <>
            <div className="flex flex-col gap-8 lg:flex-row">
                <section className="grid flex-1 md:min-h-[114px]">
                    <Card darker>
                        <CircularCredScoreProgressBar
                            animationDuration={ANIMATION_DURATION}
                            address={address}
                            maxValue={maxValue}
                            minValue={minValue}
                            valueRating={credScoreData?.value_rating || null}
                            loading={loading}
                            value={credScoreData?.value || null}
                        />
                    </Card>
                </section>
            </div>
        </>
    );
};

export default CredScoreTopSection;
