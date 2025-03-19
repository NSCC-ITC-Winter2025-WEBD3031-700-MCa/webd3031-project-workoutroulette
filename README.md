# Workout Roulette - Next.js App

### **🚀 Deployed Link**  
[https://workout-roulette.vercel.app/](https://workout-roulette.vercel.app/)

## **📌 Project Overview**
Workout Roulette is a **fitness-based web application** that allows users to select workout categories, spin a wheel to receive randomized exercises, and track their progress. Users gain **experience points (XP)** and level up based on completed workouts.

## **🔧 Setup Instructions**
Follow these steps to set up and run this project on your local machine:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-repo/workout-roulette.git
   cd workout-roulette
   ```

2. **Install dependencies**:
   ```sh
   pnpm install --shamefully-hoist
   ```
   **Note:** The `legacy-peer-deps` flag may be required due to React 19 peer dependency issues.

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your **Neon PostgreSQL database URL**:
     ```env
     DATABASE_URL="your-neon-db-url"
     SHADOW_DATABASE_URL="your-shadow-db-url"
     ```

4. **Apply Prisma migrations & generate client**:
   ```sh
   pnpm prisma generate
   pnpm prisma migrate dev --name init
   ```

5. **Seed the database with test users**:
   ```sh
   pnpm prisma db seed
   ```
   Verify test users in **Prisma Studio**:
   ```sh
   pnpm prisma studio
   ```

6. **Start the development server:**
   ```sh
   pnpm run dev
   ```
   The app will be available at **[localhost:3000](http://localhost:3000)**.

---

## **📌 Features**
- **User Authentication** (NextAuth with PostgreSQL)
- **Workout Randomization** (Spin a wheel for exercises)
- **XP & Leveling System** (Track progress with experience points)
- **Workout Completion Tracking**
- **API Integration** (Fetching exercise data from API-Ninjas Exercise API)
- **Admin Dashboard** (Planned feature)
- **Premium Features via Payment Processing** (Planned feature)

---

## **🌍 Live Deployment**
We use **Vercel** for hosting. The latest stable version is deployed at:
[https://workout-roulette.vercel.app/](https://workout-roulette.vercel.app/)

To manually deploy your changes:
```sh
vercel --prod
```

---

## **📌 Contribution Guidelines**
1. **Create a branch for your feature**:
   ```sh
   git checkout -b feature-your-feature-name
   ```
2. **Commit changes following commitlint format**:
   ```sh
   git commit -m "feat: add new feature description"
   ```
3. **Push to GitHub & create a PR**:
   ```sh
   git push origin feature-your-feature-name
   ```
4. **Request code review & merge after approval.**

---

## **📌 Roadmap & Upcoming Features**
✅ **Set up Next.js template & database**  
✅ **Implement Prisma ORM with Neon PostgreSQL**  
✅ **Create seeding script for test users**  
🚧 **Integrate API-Ninjas Exercise API**  
🚧 **Develop workout selection & tracking system**  
🚧 **Implement user authentication with NextAuth**  
🚧 **Build admin dashboard for managing users**  
🚧 **Enable premium features via Stripe**  

---

## **📌 License**
This project is **open-source** and free to use for educational and commercial purposes.

---

**🔥 Show Your Support**
If you find this project useful, please consider **starring** the repository on GitHub to support future development! 🚀



**API USED**
We use the [API Ninjas Exercise API](https://www.api-ninjas.com/api/exercises) to fetch workout details, including:
- Exercise name
- Steps for performing the workout
- Required equipment
- Targeted muscle groups
