# MediCheck Deployment Guide (Free Tier) 🚀

This guide explains how to host **MediCheck** for free using **Supabase** (Backend/AI) and **Vercel** (Frontend).

---

## Part 1: Prerequisites

1.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (Free).
2.  **Supabase Account**: Sign up at [supabase.com](https://supabase.com) (Free).
3.  **GitHub Account**: You already have this!

---

## Part 2: Deploy the Backend (The AI) 🧠

Your AI logic lives in a "Supabase Edge Function". It needs to be uploaded to the cloud.

1.  **Login to Supabase CLI** (Run in your terminal):
    ```powershell
    npx supabase login
    ```
    *Follow the browser prompts to log in.*

2.  **Link Your Project**:
    *   Go to your [Supabase Dashboard](https://supabase.com/dashboard/projects).
    *   Open your project -> **Settings** (Cog icon) -> **General**.
    *   Copy the **Reference ID** (it looks like `abcdefghijklmnop`).
    *   Run this command in your terminal:
        ```powershell
        npx supabase link --project-ref <YOUR_REFERENCE_ID>
        ```
    *   *Enter your database password if asked.*

3.  **Deploy the Function**:
    ```powershell
    npx supabase functions deploy analyze-interactions
    ```
    *   It should say `Function URL: https://<project-id>.supabase.co/functions/v1/analyze-interactions`
    *   **Note**: You must ensure your Supabase project has the "Gemini API Key" set in its secrets if you haven't already.
        ```powershell
        npx supabase secrets set GEMINI_API_KEY=your_actual_gemini_key
        ```

---

## Part 3: Deploy the Frontend (The UI) 💻

1.  **Push Code to GitHub**:
    Ensure your latest code is on GitHub (we already did this!).

2.  **Import to Vercel**:
    *   Go to your [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click **"Add New..."** -> **"Project"**.
    *   Find `medicheck` in the list and click **Import**.

3.  **Configure Environment Variables** (Critical!):
    *   In the "Configure Project" screen, expand **"Environment Variables"**.
    *   Add the variables from your local `.env` file:
        *   **Name**: `VITE_SUPABASE_URL`
        *   **Value**: *Your Supabase Project URL* (e.g., `https://xyz.supabase.co`)
        *   **Name**: `VITE_SUPABASE_ANON_KEY`
        *   **Value**: *Your Supabase Anon Key* (long string starting with `ey...`)

4.  **Deploy**:
    *   Click **"Deploy"**.
    *   Wait ~1 minute.
    *   Vercel will give you a live URL (e.g., `medicheck.vercel.app`).

---

## Part 4: Verification ✅

1.  Open your new Vercel URL.
2.  Navigate to the "Interaction Checker".
3.  Add two drugs (e.g., "Warfarin" and "Aspirin").
4.  Click **"Check for Interactions"**.
    *   If the AI analyzes and returns results, **Success!** 🎉
    *   If it fails, check the browser console (F12) and ensure your `VITE_SUPABASE_URL` and `Function` deployment are correct.

---

**Enjoy your live AI application!**
