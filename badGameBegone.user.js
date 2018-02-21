// ==UserScript==
// @name         Bad Game Begone
// @namespace    https://github.com/WadeMason/bad-game-begone
// @version      1.1
// @description  Automatically marks negatively reviewed games as "Not Interested" in Steam Queues.
// @author       Wade Mason
// @include      http://store.steampowered.com/app/*
// @include      https://store.steampowered.com/app/*
// @include      http://store.steampowered.com/explore*
// @include      https://store.steampowered.com/explore*
// @include      http://store.steampowered.com/agecheck/app/*
// @include      https://store.steampowered.com/agecheck/app/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/WadeMason/bad-game-begone/master/badGameBegone.user.js
// @updateURL    https://raw.githubusercontent.com/WadeMason/bad-game-begone/master/badGameBegone.meta.js
// ==/UserScript==

(function()
{
    'use strict';

    // Game reviews
    const reviewRecent = ( function()
    {
        if(document.getElementsByClassName('game_review_summary')[0]) return document.getElementsByClassName('game_review_summary')[0].innerHTML;
    })();
    const reviewOverall = ( function()
    {
        if(document.getElementsByClassName('game_review_summary')[1]) return document.getElementsByClassName('game_review_summary')[1].innerHTML;
    })();

    // Buttons
    const notInterested = document.getElementsByClassName('queue_btn_inactive')[1];
    const continueButton = (function()
    {
        if( document.getElementsByClassName('btn_next_in_queue')[0] )
        {
            return document.getElementsByClassName('btn_next_in_queue')[0];
        }

        if( document.getElementsByClassName('btn_next_in_queue_trigger')[0] )
        {
            return document.getElementsByClassName('btn_next_in_queue_trigger')[0];
        }

        if( document.getElementById('refresh_queue_btn') && document.getElementById('refresh_queue_btn').click )
        {
            return document.getElementById('refresh_queue_btn');
        }

        // Age Gate
        if(document.getElementById('app_agegate'))
        {
            return document.getElementsByClassName('btn_medium')[0];
        }

        if(document.getElementById('ageYear'))
        {
            document.getElementById('ageYear').value = 1996;
            return document.getElementsByClassName('btn_small')[0];
        }

        console.log('Script is likely outdated');
        return null;
    })();

    function handlePage()
    {
        if( badReview() )
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
        // Check reviews
        if((reviewRecent == 'Mostly Negative' && reviewOverall == 'Mostly Negative') || (reviewRecent == 'Negative' && reviewOverall == 'Negative') || (reviewRecent == 'Very Negative' && reviewOverall == 'Very Negative') || (reviewRecent == 'Overwhelmingly Negative' && reviewOverall == 'Overwhelmingly Negative'))
        {
            return true;
        }

        return false;
    }

    handlePage();
})();
