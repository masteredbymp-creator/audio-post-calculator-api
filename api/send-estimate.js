import { Resend } from "resend"

const resend = new Resend(
    process.env.RESEND_API_KEY
)

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        })
    }

    try {

        const data = req.body

        const {
            name,
            email,
            projectType,
            region,
            scale,
            release,
            totalRuntime,
            complexity,
            deadline,
            revisions,
            audioCondition,
            currency,
            indieBudget,
            professionalBudget,
            premiumBudget,
            timelineLow,
            timelineHigh,
            services
        } = data

        const result = await resend.emails.send({

            from: "Audio Calculator <onboarding@resend.dev>",

            to: [
                "DEINE-EMAIL@BEISPIEL.DE"
            ],

            subject:
                `New Audio Post Estimate – ${name}`,

            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 700px;
                    margin: auto;
                    color: #111;
                ">

                    <h1>
                        New Audio Post Estimate
                    </h1>

                    <h2>Client</h2>

                    <p>
                        <strong>Name:</strong>
                        ${name}
                        <br>

                        <strong>Email:</strong>
                        ${email}
                    </p>

                    <h2>Project</h2>

                    <p>
                        <strong>Project Type:</strong>
                        ${projectType}
                        <br>

                        <strong>Region:</strong>
                        ${region}
                        <br>

                        <strong>Production Scale:</strong>
                        ${scale}
                        <br>

                        <strong>Release:</strong>
                        ${release}
                        <br>

                        <strong>Runtime:</strong>
                        ${totalRuntime} min
                    </p>

                    <h2>Production</h2>

                    <p>
                        <strong>Complexity:</strong>
                        ${complexity}
                        <br>

                        <strong>Deadline:</strong>
                        ${deadline}
                        <br>

                        <strong>Revisions:</strong>
                        ${revisions}
                        <br>

                        <strong>Audio Condition:</strong>
                        ${audioCondition}
                    </p>

                    <h2>Services</h2>

                    <ul>
                        ${(services || [])
                            .map(
                                service =>
                                    `<li>${service}</li>`
                            )
                            .join("")}
                    </ul>

                    <h2>Estimated Budget</h2>

                    <p>
                        <strong>Indie:</strong>
                        ${currency}
                        ${Math.round(indieBudget).toLocaleString()}
                    </p>

                    <p>
                        <strong>Professional:</strong>
                        ${currency}
                        ${Math.round(professionalBudget).toLocaleString()}
                    </p>

                    <p>
                        <strong>Studio / Premium:</strong>
                        ${currency}
                        ${Math.round(premiumBudget).toLocaleString()}
                    </p>

                    <h2>Timeline</h2>

                    <p>
                        ${timelineLow}–${timelineHigh} days
                    </p>

                    <hr>

                    <p style="color:#777">
                        Sent from the Audio Post Budget Calculator.
                    </p>

                </div>
            `
        })

        if (result.error) {

            return res.status(500).json({
                error: result.error.message
            })

        }

        return res.status(200).json({
            success: true
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            error: "Failed to send estimate"
        })
    }
}
