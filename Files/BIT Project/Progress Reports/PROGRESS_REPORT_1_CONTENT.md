# PROGRESS REPORT 1 - CONTENT

## Project Identification Information
- **Project Title:** Wedding and Event Management System for Chance Palace Hotel Group
- **Student's Name:** W. A. A. D. Wijesingha
- **Index No:** 2014173
- **Supervisor's Name:** Ranula Gihara Gamage

## Progress Report Period
- **Start Date:** 24th November 2025
- **End Date:** 5th January 2026

---

## Work Carried Out Between This Meeting and Previous Meeting

1. **Requirement Gathering & Analysis (Week 1-2)**
   - Conducted initial client meeting with Chance Palace Hotel Group management to understand current operational challenges
   - Documented existing manual processes including email correspondence, Excel-based booking tracking, and WhatsApp communication workflows
   - Interviewed key stakeholders: General Manager (Mr. Bandula Sirikumara), Event Manager, and Sales Staff
   - Analyzed existing quotation templates, contract documents, and pricing structures
   - Compiled detailed specifications for all five venues: Grand Ballroom, Garden Terrace, Rooftop Pavilion, Conference Hall, and Poolside Area
   - Documented package details for Silver, Gold, Platinum, and Custom packages
   - Identified integration requirements for email (SMTP) and SMS gateway services
   - Created comprehensive Software Requirements Specification (SRS) document

2. **Feasibility Study (Week 3)**
   - Completed technical feasibility assessment confirming Laravel 11, PHP 8.2+, and MySQL 8.0 as appropriate technologies
   - Conducted economic feasibility analysis demonstrating projected ROI through reduced administrative overhead and improved booking conversion rates
   - Assessed operational feasibility including staff training requirements and change management considerations
   - Performed risk assessment and documented mitigation strategies
   - Compiled complete feasibility study report

3. **System Architecture & UI/UX Design (Week 4)**
   - Designed high-level system architecture following layered architecture pattern (Presentation, Application, Business Logic, Data Access layers)
   - Created detailed architecture documentation including component diagrams
   - Designed UI wireframes for public-facing website (home, venues, packages, inquiry pages)
   - Designed UI wireframes for admin dashboard (booking management, calendar, reports)
   - Designed UI wireframes for client portal (booking tracking, payment history, documents)
   - Created high-fidelity UI mockups using Figma
   - Conducted client review session and incorporated feedback

4. **Database Design & Project Setup (Week 5-6)**
   - Designed comprehensive Entity-Relationship Diagram (ERD) covering 25+ entities
   - Normalized database schema to Third Normal Form (3NF)
   - Created detailed table structures with appropriate constraints, indexes, and foreign key relationships
   - Set up local development environment using Laragon with PHP 8.2 and MySQL 8.0
   - Initialized Laravel 11 project with required configurations
   - Configured database connection and environment variables
   - Set up Git repository on GitHub with initial commit and proper .gitignore
   - Created database migrations for core tables: users, venues, packages, services, inquiries
   - Implemented Eloquent model classes with relationships defined
   - Installed and configured Laravel Breeze for authentication scaffolding
   - Installed required packages: Spatie Permission, DomPDF, Laravel Excel, Intervention Image

---

## Problems Encountered

1. **Client Availability Challenges**
   - Initial difficulty scheduling meetings with all stakeholders due to hotel's busy event season (December holidays)
   - **Resolution:** Conducted multiple shorter sessions and utilized WhatsApp for async clarification of requirements

2. **Complexity of Pricing Rules**
   - The hotel's pricing structure proved more complex than initially anticipated, with multiple seasonal variations, weekend surcharges, and tiered guest pricing
   - **Resolution:** Spent additional time documenting all pricing scenarios and designed a flexible dynamic pricing engine architecture

3. **Legacy Data Format Issues**
   - Existing data in Excel spreadsheets had inconsistent formatting and duplicate entries
   - **Resolution:** Created data cleaning strategy and documented data migration approach for go-live phase

4. **UI/UX Iteration**
   - Client requested significant changes to initial dashboard wireframes after first review
   - **Resolution:** Conducted additional design session and created revised mockups incorporating feedback

---

## Planned Work That Were Unable to Carry Out with Reasons

1. **Authentication Module Implementation (Partially Delayed)**
   - While authentication scaffolding was set up, full implementation of role-based access control was moved to next period
   - **Reason:** Additional time spent on comprehensive database design and UI revisions
   - **Impact:** Minor - Authentication is first task for PR2 and schedule remains on track

2. **Email Template Setup**
   - Email template management was planned but deferred
   - **Reason:** Prioritized core database schema and project foundation
   - **Impact:** None - This is scheduled for later phase (PR5)

---

## Work Planned Until Next Meeting

**Period: 6th January 2026 - 16th February 2026 (Progress Report 2)**

1. **Authentication & Authorization Module (Week 7-8)**
   - Complete user registration with email verification
   - Implement secure login with session management
   - Configure Spatie Permission package for role-based access control
   - Create five user roles with permission matrix
   - Implement user profile management
   - Create admin user management interface
   - Implement activity logging for audit trail

2. **Venue & Calendar Management Module (Week 9-10)**
   - Implement venue CRUD operations with image gallery
   - Integrate FullCalendar library for interactive availability calendar
   - Create real-time availability checking with conflict detection
   - Implement color-coded calendar (Available/Booked/Tentative/Blocked)
   - Create date range blocking functionality for maintenance

3. **Package & Service Management Module (Week 11-12)**
   - Implement package CRUD with versioning for pricing history
   - Create service catalog management
   - Build dynamic pricing engine with:
     - Guest count tier pricing
     - Weekend surcharges
     - Peak season adjustments
   - Create package comparison tool
   - Implement CSV import/export for bulk service management

4. **Testing & Documentation**
   - Write unit tests for authentication service
   - Write unit tests for availability service
   - Write unit tests for pricing service
   - Update technical documentation

---

## Summary

Progress Report 1 covers the foundational phase of the project, which has been completed successfully with minor adjustments to the schedule. All critical deliverables for this period have been achieved:

- ✅ Requirements documented in SRS
- ✅ Feasibility study completed
- ✅ System architecture designed
- ✅ UI wireframes and mockups created
- ✅ Database schema designed (ERD)
- ✅ Development environment configured
- ✅ Laravel project initialized
- ✅ Core database migrations created
- ✅ Git repository established with regular commits

The project is progressing as planned and is ready to move into the core development phase.

---

## Attachments (To Include with Progress Report)

1. Software Requirements Specification (SRS) document
2. Feasibility Study Report
3. System Architecture Diagram
4. UI Wireframes (PDF export from Figma)
5. Entity-Relationship Diagram (ERD)
6. Database Schema Documentation
7. Git commit history log (screenshot)
