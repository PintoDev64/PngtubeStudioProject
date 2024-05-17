// Types
import { IntComponentPropagator } from "../types";

export default function ComponentsPropagator({ Data }: IntComponentPropagator) {
    return (
        <>
            {
                Data.map(({ Id, Component, Execute, ChangeCondition, Complement }) => 
                    <Component key={Id} Execute={Execute} ChangeCondition={ChangeCondition} Complement={Complement}/>
                )
            }
        </>
    )
}