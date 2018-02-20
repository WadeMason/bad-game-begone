// ==UserScript==
// @name         Bad Game Begone
// @namespace    https://github.com/WadeMason/bad-game-begone
// @version      1.0
// @description  Automatically marks negatively reviewed games as "Not Interested" in Steam Queues.
// @author       Wade Mason
// @include      http://store.steampowered.com/app/*
// @include      https://store.steampowered.com/app/*
// @include      http://store.steampowered.com/explore*
// @include      https://store.steampowered.com/explore*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/WadeMason/bad-game-begone/master/badGameBegone.js
// ==/UserScript==

(function()
{
    'use strict';

    // Game reviews
    const reviewRecent = (function()
    {
        if(document.getElementsByClassName('game_review_summary')[0]) return document.getElementsByClassName('game_review_summary')[0].innerHTML;
    })();
    const reviewOverall = (function()
    {
        if(document.getElementsByClassName('game_review_summary')[1]) return document.getElementsByClassName('game_review_summary')[1].innerHTML;
    })();

    // Buttons
    const notInterested = document.getElementsByClassName('queue_btn_inactive')[1];
    const continueButton = (function()
    {
        if(document.getElementsByClassName('btn_next_in_queue')[0])
        {
            return document.getElementsByClassName('btn_next_in_queue')[0];
        }

        if( document.getElementsByClassName('btn_next_in_queue_trigger')[0] )
        {
            return document.getElementsByClassName('btn_next_in_queue_trigger')[0];
        }

        if( document.getElementById('refresh_queue_btn') && document.getElementById('refresh_queue_btn').click)
        {
            return document.getElementById('refresh_queue_btn');
        }

        // Age requirement (src: https://github.com/PotcFdk/SteamDiscoveryQueueAutoSkipper)
        if (document.getElementById ("app_agegate"))
        {
            var btn_medium = document.getElementById ("app_agegate").getElementsByClassName ("btn_medium");
            if (btn_medium)
            {
                for (i = 0; i < btn_medium.length; i++)
                {
                    if (btn_medium[i].getAttribute("onclick").includes("HideAgeGate"))
                    {
                        click (btn_medium[i]);
                    }
                }
            }
        }

        if (document.getElementById ("ageYear"))
        {
            document.getElementById ("ageYear").value = 1985;
            if (DoAgeGateSubmit)
            {
                DoAgeGateSubmit();
            }
        }


        console.log('Not in queue');
        return null;
    })();

    function handlePage()
    {
        if(badReview())
        {
            notInterested.click();
            continueButton.click();
        }
        else
        {
            continueButton.click();
        }
    }

    function badReview()
    {
        // Check recent reviews
        if(reviewRecent == 'Mostly Negative' || reviewRecent == 'Negative' || reviewRecent == 'Very Negative' || reviewRecent == 'Overwhelmingly Negative')
        {
            return true;
        }

        // Check overall reviews
        if(reviewOverall == 'Mostly Negative' || reviewOverall == 'Negative' || reviewOverall == 'Very Negative' || reviewOverall == 'Overwhelmingly Negative')
        {
            return true;
        }

        return false;
    }

    handlePage();
})();
