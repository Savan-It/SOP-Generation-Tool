module.exports = ({ sopContent, userdata }) => {
    return `
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>${userdata.fullName}-statement of purpose</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, Helvetica, sans-serif;
            }
            .break{
                margin-bottom: 20px;
            }

            .container {
                padding: 100px;
            }
            .mt-100{
                margin-top: 100px;
            }

            h1 {
                font-size: 16px; 
                font-weight: bold;
                margin-bottom: 20px;
            }

            p {
                font-size: 14px;
            }

            .mb-20{
                margin-bottom: 20px;
            }

            .mt-20{
                margin-top: 20px;
            }
            ol {
                list-style-type: decimal;
            }
            .contact {
                font-size: 14px;
                margin-top: 10px;
            }
            .closing {
                font-size: 14px;
                margin-top: 20px;
            }

            .page-break {
                page-break-after: always;
            }

        </style>

    </head>
    <body>
        <div class="container">
            <p class="mb-20">Hi ${userdata.fullName},</p>
            <p class="mb-20">Thanks for using our free SOP drafting service! Your SOP is attached below.</p>

            <h1>If you would like further help as follows:</h1>

            <ol>
            <li>Get a complete statement of purpose framed/reviewed by our experts - Buy it here:
            <a href="https://effizient-immigration-inc.square.site/product/sop/9?cp=true&sa=true&sbp=fals
            e&q=false">https://effizient-immigration-inc.square.site/product/sop/9?cp=true&sa=true&sbp=fals
            e&q=false</a></li>
            <li>et your visa application reviewed before submission to IRCC</li>
            </ol>

            <pclass="mb-20">Feel free to contact us!</pclass=>
            <p class="contact">226-774-9168</p>
            <p class="contact">info@effizient.ca</p>
            <p class="contact"><a href="https://www.effizieint.ca">www.effizieint.ca</a></p>
            
            <p class="mb-20 mt-20">We will get you going with your visa application in no time. This will all be remote, which
            means you won’t have any hassle at all!</p>

            <div class="closing mb-20">
                <p>Best Regards,</p>
                <p>Team Effizient</p>
            </div>

            <div class="page-break"></div>
            
            <p class="mt-100">${sopContent.split('\n').map(line => `<p>${line}</p>`).join('')}</p>
       </div>
    </body>
    </html>
    `;
}