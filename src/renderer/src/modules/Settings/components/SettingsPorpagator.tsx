// Contants
import Contants from "../utils"

export default function SettingsListPropagator() {

    const { SettingsListDetails } = Contants()

    return (
            <ul id="SettingsList-Content-Scroll-Capsule">
                {
                    SettingsListDetails.map(({ Id, ChangeCondition, Text, Execution }) =>
                        <li key={Id} className={
                            ChangeCondition
                                ? "SettingsList-Content-Scroll-Element SettingsRouter-Selected"
                                : "SettingsList-Content-Scroll-Element"
                        } onClick={Execution}>
                            <p>{Text}</p>
                        </li>
                    )
                }
            </ul>
    )
}