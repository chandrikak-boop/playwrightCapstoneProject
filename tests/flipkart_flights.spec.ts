import {expect,test} from '@playwright/test';
import HomePage from '../pages/flipkart_flight/home.page';
import FlightsPage from '../pages/flipkart_flight/enterFlightDetails.page';
import SelectFlightPage from '../pages/flipkart_flight/selectFlight.page';
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
        await flightsPage.enterFromLocation('Bangalore');
        await flightsPage.enterToLocation('Delhi');
        await flightsPage.selectDepartureDate('March 2026',15);
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