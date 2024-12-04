// The following code uses EmailJs to send me an email when a user has entered my site or clicked on my resume. 
// It doesn't send me anything about the user except what link they used to access my site.
// Reason: Did not want to use something like google analytics due to privacy concerns.


emailjs.init("M9MpKGUB8dcPxrCHR"); // Initalized EmailJS.
let disabled = false;
disabled = true;

const navigationObservor = new PerformanceObserver(PageObservor); //observs the page and sends a list to the function

navigationObservor.observe({type:"navigation", buffered: true});

//For when site was just accessed:
function PageObservor(PerformanceEntries){
    PerformanceEntries.getEntries().forEach((entry) => {
        //for each performance entry:
        // console.log("Performance entry: ", entry.type);
    
        //May be: "back_forward" or "reload" -> if either of these are true, do not send email.
        
        if (!(entry.type === "back_forward") && !(entry.type === "reload")){
            // if not back forth or refresh: 

            //check what link we came from:
            const ReferrerLink = document.referrer;
            let fromLink = document.referrer;


            //ensure we did not come from another page of the site.
            if (!(document.referrer.includes("https://arshvirgoraya.com")) && !(document.referrer.includes("https://arshvirgoraya.github.io"))){
                //if not from the same site + not refreshed + not back/forth, can send from email.

                if (!ReferrerLink){   //if referrer is empty, likely came from a direct link.
                    fromLink = "direct link";
                }
                autoMail("Accessed site", "Came from: " + fromLink);
            }
            else{
                // console.log("=> Came from same site");
            }
        }
        else{
            // console.log("=> Refreshed or Back/forth")
        }
    });
}

//For when Resume is clicked: 
const Mobresume = document.querySelector('.mob-resume');
const Deskresume = document.querySelector('.resume');
Mobresume.addEventListener("click", () => {
    autoMail("Clicked on resume", "From page: " + window.location.href);
})
Deskresume.addEventListener("click", () => {
    autoMail("Clicked on resume", "From page: " + window.location.href);
})

function autoMail(Action, Referrer){
    if (disabled){return;}

    if (window.location.href.startsWith("https")){
            //startsWith with Statement: ensures to only send when im not using a live server :)
        var templateParams = {
            action_id: Action,
            referrer_id: Referrer,
            url_id: window.location.href
        };

        emailjs.send('service_8ohbh5l', 'template_6a518gv', templateParams) //Insert your email service ID and email template ID
        .then(function(response) {
        //    console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
        //    console.log('FAILED...', error);
        });

        // if (window.location.href == "https://arshvirgoraya.com"){
        //     //Only send if currently in a link that will NOT get redirected (i.e., www. or github).
        // }
    }
    else{
        //live server 
        // console.log("On live server. Not sending email: ", Referrer);
    }
}