import {expect,test} from '@playwright/test';
import HomePage from '../pages/flipkart_flight/home.page';
import FlightsPage from '../pages/flipkart_flight/enterFlightDetails.page';
import SelectFlightPage from '../pages/flipkart_flight/selectFlight.page';
import flightData from '../data/flightData.json';
test.describe('Flipkart Flight Booking Test',()=>{
    let homePage:HomePage;
    let flightsPage:FlightsPage;
    let selectFlightPage:SelectFlightPage;

    test('Navigate to Flights Page',async({browser})=>{
        const context=await browser.newContext(
            {
                'permissions':['notifications']
            }
        );
        const page=await context.newPage();
        homePage=new HomePage(page);
        await homePage.navigateToFlights();
        await expect(page).toHaveTitle('Flight bookings, Cheap flights, Lowest Air tickets at Flipkart.com');
        console.log(await page.title());
        
        flightsPage=new FlightsPage(page);
        await flightsPage.enterFromLocation(flightData.from);
        await flightsPage.enterToLocation(flightData.to);
        await flightsPage.selectDepartureDate(flightData.month,flightData.day);
        await flightsPage.clickDone();
        await flightsPage.searchFlights();
        //await expect(page).toHaveTitle(/Flights from Bangalore to Delhi/);
        await page.waitForLoadState('networkidle');
        console.log(await page.title());
        selectFlightPage=new SelectFlightPage(page);
        await selectFlightPage.applyStopsFilter();
        await selectFlightPage.clickBookButton();
    });
});