SahyogSetu

Digital Marketplace for Labour Cooperatives &amp; Local Service Workers
SahyogSetu is a digital platform designed to connect customers with verified local service workers through Labour Cooperative Societies, enabling transparent service discovery, fair compensation, cooperative-based worker management, and better access to local employment opportunities.
The project is being developed around the vision of creating a digital marketplace owned and supported by the cooperative ecosystem, rather than leaving workers dependent on conventional private gig platforms.

This repository currently contains the SahyogSetu working prototype.
The production system described below represents the proposed final solution and is not fully implemented in this prototype.


1. The Problem
Local service workers such as electricians, plumbers, carpenters, painters, mechanics, cleaners, and other skilled workers often operate through fragmented and informal channels.
This creates challenges for both workers and customers:
For workers


Limited access to reliable customers


Dependence on informal intermediaries


Unstable income and inconsistent work


Limited digital presence


Difficulty demonstrating skills and experience


Lack of transparent job and payment records


Limited access to cooperative welfare and social-security benefits




          
            
          
        
  
        
    

For customers


Difficulty finding trustworthy local workers


Uncertainty about worker skills and experience


Lack of transparent pricing


Difficulty comparing available workers


Poor visibility into booking and job status


For Labour Cooperatives


Manual worker and booking management


Limited digital reach


Difficulty coordinating jobs among members


Fragmented records


Limited analytics for understanding worker demand and performance



2. The SahyogSetu Solution
SahyogSetu proposes a cooperative-first digital service marketplace connecting:
                    SAHYOGSETU
                        │
          ┌─────────────┼─────────────┐
          │             │             │
      CUSTOMERS      WORKERS       COOPERATIVES
          │             │             │
     Find services   Find jobs    Manage network
     Book workers    Manage jobs  Verify workers
     Track jobs      Track income Manage bookings
     Make payments   View welfare View analytics
The platform is intended to provide a common digital layer for:
Service Discovery → Worker Matching → Booking → Job Execution → Payment → Reviews → Cooperative Management

3. What This Prototype Demonstrates
The current repository is a working UI/UX and workflow prototype created to demonstrate the proposed SahyogSetu experience.
The prototype demonstrates three major perspectives:
Customer


Service discovery


Service categories


Worker profiles


Worker selection


Booking flow


Booking tracking


Payment flow


Reviews




          
            
          
        
  
        
    

Worker


Worker dashboard


Job requests


Job management


Earnings


Skills/profile


Welfare information


Cooperative profile


Cooperative Administrator


Cooperative dashboard


Worker verification


Booking management


Payment monitoring


Analytics


Cooperative settings


The prototype also demonstrates:


Responsive interface


English/Hindi-ready UI


Role-based navigation


Demo authentication


Booking workflows


Worker/job states


Earnings and payment views


Dashboard analytics


Browser-persisted demo state



4. Prototype vs Proposed Production System
It is important to distinguish between the working prototype and the proposed production platform.
CapabilityCurrent PrototypeProposed ProductionCustomer service discovery✅ Implemented✅Worker profiles✅ Implemented✅Booking workflow✅ Demonstrated✅Worker job management✅ Implemented✅Earnings dashboard✅ Demonstrated✅Cooperative dashboard✅ Implemented✅Worker verification UI✅ Demonstrated✅ Real verification workflowPayments🟡 MockedReal payment integrationAuthentication🟡 MockedSecure production authenticationOTP🟡 SimulatedSMS/OTP providerIdentity verification🟡 MockedVerified identity/KYC workflowDatabase🟡 Demo state/localStoragePostgreSQL production databaseWorker matching🟡 Prototype workflowProduction matching engineNotifications🟡 PrototypeSMS/push/email notificationsLocation services🟡 Prototype dataMaps/geolocation servicesCooperative records🟡 Demo dataSecure cooperative recordsAnalytics🟡 Sample dataProduction analyticsWelfare integration🟡 DemonstrationIntegration with eligible schemes/servicesSecurityPrototype-levelProduction security architecture
The prototype intentionally uses simulated data and services so that the complete user experience can be demonstrated without requiring real financial, government, identity, or SMS integrations.

5. Proposed Production Platform
The long-term SahyogSetu solution is intended to evolve into a secure, scalable platform connecting customers, workers, and Labour Cooperative Societies.
Customer Platform
Customers will be able to:


Discover nearby services


Search by skill/category


View verified worker profiles


Compare worker experience, skills and ratings


Request or book services


Receive worker recommendations


Track bookings


Communicate regarding jobs


Make digital payments


Rate and review completed services


View booking and payment history



Worker Platform
Workers will be able to:


Create and manage their professional profile


List skills and experience


Receive suitable job requests


Accept or decline jobs


Manage ongoing work


View upcoming bookings


Track earnings


View payment history


Build a verified work history


Access cooperative information


View eligible welfare/social-security information


Receive notifications about relevant opportunities


The production system should prioritize simple, accessible workflows, particularly for workers who may have limited digital experience.

Cooperative Platform
Labour Cooperative administrators will have tools to:


Register and manage workers


Verify worker information


Review skills and documents


Manage cooperative membership


Monitor bookings


Coordinate workers


Track payments


View worker earnings


Monitor service demand


Analyze cooperative performance


Manage service categories


Manage cooperative information


Generate reports


This makes SahyogSetu more than a conventional service marketplace: it provides a digital management and market-access layer for Labour Cooperatives.

6. Intelligent Worker–Job Matching
A major component of the proposed production system is intelligent matching.
Instead of simply displaying every available worker, SahyogSetu can rank suitable workers using factors such as:
Customer Requirement
        │
        ├── Service / Skill
        ├── Location
        ├── Availability
        ├── Experience
        ├── Rating
        ├── Price
        └── Previous Work
        │
        ▼
   Matching Engine
        │
        ▼
Recommended Workers
The objective is to help customers find suitable workers while improving the quality and relevance of job opportunities available to cooperative members.
The prototype demonstrates the intended workflow; a production implementation would use a proper matching service and real operational data.

7. Fair &amp; Transparent Earnings
SahyogSetu is designed around greater transparency in worker compensation.
The production platform can provide a clear breakdown of:
Customer Payment
       │
       ├── Worker Compensation
       ├── Applicable Service / Platform Charges
       └── Other Applicable Costs
Workers should be able to clearly see:


Agreed service amount


Platform/service charges where applicable


Final worker payout


Payment status


Earnings history


This helps create a more transparent relationship between customers, workers, and cooperatives.

8. Worker Verification
The production platform is intended to provide a structured worker verification workflow through the cooperative.
Potential verification information may include:


Identity verification


Cooperative membership


Skills


Experience


Certifications where applicable


Work history


Profile verification status


The prototype contains a verification interface, but does not perform real identity verification.
No real government identity system is connected to this repository.

9. Welfare &amp; Social-Security Layer
SahyogSetu is also designed to help cooperative members discover and access relevant welfare and social-security opportunities.
The production system could provide:


Worker welfare information


Eligibility indicators


Relevant government/cooperative schemes


Application guidance


Benefit status where officially integrated


Any government or third-party integration would only be implemented through authorized APIs and appropriate security/compliance mechanisms.
The current prototype only demonstrates the user experience and information architecture.

10. Proposed Production Architecture
The prototype is intentionally lightweight.
The proposed production system would evolve into a service-oriented architecture:
                    Web / Mobile Clients
                           │
                           ▼
                    API / Backend Layer
                           │
          ┌────────────────┼────────────────┐
          │                │                │
       Identity         Marketplace      Cooperative
       Service            Service         Service
          │                │                │
          ├────────────┬───┴────┬───────────┤
          │            │        │
       Booking      Matching   Payments
        Service      Engine     Service
          │            │        │
          └────────────┼────────┘
                       │
                 PostgreSQL DB
                       │
          ┌────────────┼────────────┐
          │            │            │
       Storage     Notifications  Analytics
The production architecture would additionally incorporate:


Secure authentication and authorization


Role-based access control


API validation


Database transactions


Audit logs


Secure file storage


Encryption


Rate limiting


Monitoring and logging


Backup and recovery


Scalable deployment



11. Proposed Production Technology Stack
The production stack can use practical, scalable, and largely open-source technologies.
Frontend


Next.js


React


TypeScript


Tailwind CSS


shadcn/ui




          
            
          
        
  
        
    

Backend


Node.js


TypeScript


REST APIs / modular backend services


Database


PostgreSQL


Drizzle ORM


Authentication
A secure production authentication provider or self-hosted authentication layer with:


OTP authentication


Session management


Role-based access control




          
            
          
        
  
        
    

Storage
Object storage for:


Worker documents


Profile images


Verification documents


Service images


Maps &amp; Location
A production maps/geolocation provider for:


Nearby worker discovery


Distance estimation


Service-area matching


Navigation support


Notifications
Integration with appropriate:


SMS


Email


Push notification


providers.


          
            
          
        
  
        
    

Analytics


Recharts / dashboard visualization


Backend-generated operational metrics


Production analytics infrastructure as required


Deployment
A practical deployment model can use:
Next.js Frontend
       ↓
     Vercel

Backend / APIs
       ↓
Render / Railway / equivalent

PostgreSQL
       ↓
Managed PostgreSQL / Supabase
The final deployment architecture would be selected based on scale, cost, security, and operational requirements.

12. Security &amp; Privacy
A production implementation must treat worker and customer information as sensitive operational data.
The production platform should include:


Secure authentication


Role-based authorization


Encrypted communication


Password/session security where applicable


Input validation


API authorization


Secure document storage


Protection against common web vulnerabilities


Audit logging for administrative actions


Data minimization


Controlled access to verification information


Secure payment processing through authorized providers


No real personal identity, government, banking, or payment information is used by this prototype.

13. Current Prototype Data
The prototype uses fictional/demo records.
Demo state is seeded from:
src/lib/demo-context.tsx
Changes are persisted locally in the browser using:
localStorage
under:
sahyogsetu-demo-v1
The application includes a reset mechanism to restore the original demo state.
The repository contains Drizzle/PostgreSQL configuration to establish a foundation for future database development, but the current prototype does not use a live production database.

14. Demo Access
The main login is available at:
/login
Customer
Mobile: 9876543210
OTP: 123456


          
            
          
        
  
        
    

Worker
Mobile: 9876543211
OTP: 123456
Cooperative Administrator
URL: /admin/login

Email: admin@sahyogsetu.demo
Password: coop2026
These credentials are prototype-only demo credentials.
No real authentication service is connected.

15. Recommended Demo Flow
For evaluating the prototype, the following workflow demonstrates the core concept:
Customer
   ↓
Discover Service
   ↓
View Worker
   ↓
Book Service
   ↓
Track Booking
   ↓
Payment
   ↓
Review
Then demonstrate the worker perspective:
Worker
   ↓
Receive Job
   ↓
Accept Job
   ↓
Manage Work
   ↓
Complete Job
   ↓
View Earnings
Finally, demonstrate the cooperative perspective:
Cooperative Admin
   ↓
Verify Worker
   ↓
Manage Bookings
   ↓
Monitor Payments
   ↓
View Analytics
Together these workflows demonstrate how SahyogSetu connects the three stakeholders into one ecosystem.

16. Main Routes
Customer
/login
/customer
/customer/services
/customer/bookings


          
            
          
        
  
        
    

Worker
/worker
/worker/jobs
/worker/earnings
Cooperative Administrator
/admin/login
/admin/dashboard
/admin/verification
/admin/analytics
Additional screens are available within the application for profiles, payments, tracking, welfare, and cooperative management.

17. Project Structure
src/
├── app/
│   ├── App Router pages
│   └── API routes
│
├── components/
│   ├── Shared UI
│   ├── Navigation
│   ├── Cards
│   ├── Charts
│   └── Authentication components
│
├── db/
│   ├── Drizzle schema
│   └── Database configuration
│
├── lib/
│   ├── Demo state
│   ├── Seed data
│   ├── Translations
│   └── Utilities
│
└── public/
    ├── Brand assets
    └── Demo avatars

18. Getting Started
Requirements


Node.js 20+


npm


Install
npm install
Run development server
npm run dev
Open:
http://localhost:3000
Production build
npm run build
npm run start
Other commands
npm run lint
npm run typecheck

19. Prototype Limitations
The following functionality is intentionally simulated:


Authentication


OTP delivery


Identity verification


Payment processing


Government integrations


SMS notifications


Live cooperative records


Production database


Real-time worker location


Production-grade worker matching


Production security infrastructure


This is intentional.
The objective of this prototype is to demonstrate the proposed workflow, user experience, and system concept before implementing the complete production infrastructure.

20. Future Development Roadmap
Phase 1 — Prototype


✅ Core customer experience


✅ Worker experience


✅ Cooperative administrator console


✅ Booking workflow


✅ Worker/job management


✅ Earnings views


✅ Analytics


✅ Responsive UI


✅ Demo authentication




          
            
          
        
  
        
    

Phase 2 — MVP


Production authentication


PostgreSQL database


Worker onboarding


Cooperative management


Real service listings


Real booking APIs


Worker matching


Notifications


Payment integration


Secure document storage


Phase 3 — Production Platform


Scalable backend architecture


Intelligent worker-job matching


Real-time booking updates


Maps and location services


Advanced analytics


Welfare integrations


Cooperative-level reporting


Mobile application


Stronger verification workflows


Production monitoring and security


Phase 4 — Network Expansion
The platform can eventually support a larger network of Labour Cooperatives across regions, enabling:
Local Cooperatives
        ↓
Regional Network
        ↓
SahyogSetu Platform
        ↓
Customers + Businesses
This can create a scalable digital marketplace while keeping cooperatives and their workers at the centre of the ecosystem.

21. Vision
SahyogSetu is not intended to simply be another service-booking application.
The broader vision is to provide Labour Cooperative Societies with a digital marketplace and operational platform through which their members can gain better access to customers, jobs, transparent earnings, and cooperative services.
                 SAHYOGSETU

        ┌─────────────────────────┐
        │   DIGITAL MARKETPLACE    │
        └────────────┬────────────┘
                     │
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
   CUSTOMERS      WORKERS      COOPERATIVES
       │             │             │
       ↓             ↓             ↓
    SERVICES       JOBS        MANAGEMENT
       │             │             │
       └─────────────┼─────────────┘
                     ↓
              TRUST + FAIRNESS
                     ↓
             BETTER LIVELIHOODS
SahyogSetu — connecting communities, cooperatives, and opportunities.-----------------------------------------------------------------Prototype Disclaimer
This repository represents a working prototype developed to demonstrate the proposed SahyogSetu workflow and user experience. Several production capabilities such as authentication, OTP delivery, payments, identity verification, government integrations, and live cooperative records are intentionally mocked or simulated. The production architecture and capabilities described in this README represent the proposed evolution of the solution and are not claims that these systems are currently deployed.