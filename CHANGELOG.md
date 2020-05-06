# Changelog

## [1.1.4] - 2020-05-05

### Added

-   Toggle button on Admin Rosters to show archived camps

### Changed

-   Registration details now redirects to prior page upon deletion
-   Camp fullName virtual now includes year based on camp start date
-   User page now separates out current and past registrations based on archived status

## [1.1.3] - 2019-02-04

### Added

-   Toggle button on Admin Registrations, Camps, and Payments to show Archived entries
-   Toggle functionality for archived entries in equivalent routes

## [1.1.2] - 2019-12-29

### Added

-   Survey Question at the end of First Time Wizard
-   Reporting for survey question in admin view
-   "Copy All Emails" button in admin view

### Changed

-   Changed early bird amount to \$40
-   Fixed bug in update user route that prevented the correct user from being updated
-   Changed age range for allowed registrations from 8 - 15 for all camps

## [1.1.1] - 2019-12-27

### Added

-   Added "All Ages" camp functionality:
    -   Added "all" to enum for camp types
    -   Added error handling to routes to account for new camp type
    -   Added "All Ages" selection to camp types for admin create camp form
    -   Commented out routes on user registration view for camp type selection, added new route straight to camp list

### Removed

-   Commented out "North" option for pickup on all registration forms

## [1.1.0] - 2019-12-24

### Added

-   Created migration to add "archived" field to camps, registrations, and payments
-   Added logic to hide archived records from app
-   Added a "Global Settings" DB object to store settings for archived/early bird dates
-   Added a "Settings" page to admin views to modify settings object
-   Added a dynamic value for the early bird date to the client and server payment logic
-   Added a field for "spaceSaved" on registration, along with migration for existing registrations
-   Added backend logic to count "spaceSaved" along with "paid' and "deposit" for reserving spot in camp
-   Added "Space Saved" as option on admin registration forms w/ UI indicators
-   Form to edit payment notes from admin user screen
-   Added special needs report to camp view
-   Added secondary email to camp email lists when available
-   Added validation on registration route to confirm there is an emergency contact number

### Changed

-   Fixed bug that prevented migrations from running in gulpfile

### Removed

-   removed waitlisted campers from csv reports

## [1.0.15] - 2019-05-29

### Added

-   Waitlist flag on admin user detail
-   Separate email for waitlist confirmation

## [1.0.14] - 2019-05-26

### Added

-   Sends email confirmation upon successful registration
-   Gender to swimming report CSV

### Changed

-   Changed copy email address buttons on roster page to use primary contact email
-   Swim list edit page now sorts alphabetically by first name

## [1.0.13] - 2019-05-19

### Changed

-   Changed copy email address buttons on roster page to use primary contact email

## [1.0.12] - 2019-05-12

### Added

-   Payment Status field to Monday morning csv export
-   Popover note info on roster pages
-   Copy deposit emails button on roster page
-   Bus Schedule Modal on Roster page

### Changed

-   Changed text for payment confirmation email
-   Filtering for unpaid registrations

## [1.0.11] - 2019-04-28

### Added

-   Warning about unpaid registrations on user overview page
-   List of unpaid registrations on admin rosters

## [1.0.10] - 2019-04-28

### Changed

-   Delete Registration button on user overview is now functional

### Added

-   Default sort order option for search tables
-   Notes field on admin payment screen

## [1.0.9] - 2019-04-18

### Changed

-   Sorting tables are now case insensitive
-   Admin registrations now sortable by creation date instead of camp start date

### Added

-   Waitlisted flag for registrations on Admin registration page
-   Delete functionality to admin User page
-   Waitlists to admin rosters
-   Total numbers to the top of admin rosters

## [1.0.8] - 2019-04-14

### Changed

-   Fixed issue with waitlists not properly updating upon payment.

## [1.0.7] - 2019-04-09

### Changed

-   Waitlist status now displays upon registering for a waitlisted camp.
-   Payment is no longer possible for waitlisted sessions.

## [1.0.6] - 2019-03-21

### Changed

-   Fixed a bug causing malformed filenames when downloading .csv reports.

## [1.0.5] - 2019-03-18

### Added

-   Admins can view Payment details, including a link to the relevant transaction on paypal.com.

### Changed

-   Only Payments which have been executed will be visible throughout the client to avoid confusion.
-   Fixed bug in ContactInformationContainer that caused the app to crash when no data had been entered for Contact Info.

## [1.0.4] - 2019-02-28

### Added

-   Admins can view, modify and delete registrations in new registration detail page.
-   Admins can see Camper age in roster detail page.
-   Admins can add registrations from the Camper detail page.

### Changed

-   Fixed broken CSV download links for Admins.
-   Secondary Contact Email Address is now optional.

### Removed

### Developer Notes

#### Server

-   Separated API into user and admin routes. In general user routes will derive any required userId from the session. The admin routes will require an admin user to be logged in and allow userIds to be passed in as arguments.
-   Each route should now be using boom style error messages. More information over at hapijs/boom.
-   Each route handler is stored in a separate file.

#### Client

-   The client side views were combed through to make sure the new routes were being used correctly.
-   Added the search table component to the user, registration and payment list views for the admins.
-   The detail views now have a dropdown in the upper-right hand which provides access to specific options for each document (edit, delete etc).
-   The user views were mostly unchanged except the registration screens. Those I refactored a bit to make the experience a bit more streamlined.

#### Database

-   There are now database migrations which need to be run. The simplest way is to make sure the environment variables in `/server/.env` are pointing to the correct environment and then running `npm run migrate`.

## [1.0.3] - 2019-01-17

### Added

-   Warning for all Users when cookies are currently disabled.
-   Prompt for all Users to use the latest version of Chrome or Firefox.
-   Campers can now be deleted from the admin panel.
-   Footer containing copyright, company website link and developer website link.

## [1.0.2] - 2019-01-10

### Added

-   Both Admins and Users will receive confirmation emails on all successful payments.
-   Admin roster view.
-   Admins can generate camp reports (Contact, Swimming, and Monday) via the roster detail page.
-   Admins can quickly assign swimming strength attributes to campers via the roster detail page.
-   Admins can sort and search items in the Camp, Camper and Roster list pages.

### Changed

-   **Combined wet-wild-camp and wet-wild-camp-backend into a single git repository (monorepo)**
-   Adjusted verbiage on the first-time User wizard
-   Campers and Contact Information now display properly for Admins.
-   Camp schedules are now sorted by start date for Users.
-   Replaced `/register` with `/signup` for unauthenticated Users.
-   Fixed error message not appearing on checkout screen except in limited cases for Users.
-   Fixed error message not appearing when a User attempts to register an account with an email address already on file.
-   Improved browser support for IE9, IE10, IE11.

### Removed

-   First step from the first-time User wizard.

## [1.0.1] - 2018-12-31

### Added

-   This changelog.
-   Allow Users to perform password resets.
-   Support for SMTP relays.
-   Support for Early Bird pricing.
-   First-time User wizard to collect contact information and guide new Users.

### Changed

-   Many visual tweaks, form validations and loading indicators.

### Removed

-   Mailgun.io dependency.
-   Privacy Policy, Help, and Terms of Service links which lead to no content.
