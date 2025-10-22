import google.generativeai as genai
import os
import datetime

# --- Configuration ---
# 1. Get your API key from https://ai.google.dev
# 2. Paste it here:
API_KEY = "YOUR_API_KEY_HERE"
# ---------------------

def init_gemini(api_key):
    """
    Initializes the Google Generative AI client.
    Инициализирует клиент Google Generative AI с вашим ключом.
    """
    try:
        genai.configure(api_key=api_key)
        print("Google AI Studio (Gemini) initialized successfully.")
    except Exception as e:
        print(f"Error initializing Google AI: {e}")
        print("Please ensure you have set the correct API_KEY.")
        raise

def create_assignment_plan(assignment_description: str) -> str:
    """
    Generates a step-by-step assignment plan based on its description
    using the free Google AI (Gemini) API.

    Args:
        assignment_description: The full text description of the university assignment.

    Returns:
        A string containing the generated plan in English.
    """
    
    # 1. Initialize the model
    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
    except Exception as e:
        print(f"Error loading model: {e}")
        return "Error: Could not load the generative model."

    # 2. Get today's date
    today = datetime.date.today().strftime("%B %d, %Y")

    # 3. Create the prompt
    prompt = f"""
    You are a **Senior University Strategist** and **Project Management Expert**. Your sole task is to generate a comprehensive, actionable academic plan for the assignment provided.

    **PLAN LANGUAGE: English**

    **Current Date:** {today}
    **Assignment Details:**
    ---
    {assignment_description}
    ---

    **PLAN INSTRUCTIONS:**
    1.  **Phases:** Structure the plan using 4-5 logical phases (e.g., Analysis, Research, Drafting, Review).
    2.  **Steps:** Use clear, specific, and actionable steps within each phase.
    3.  **Timeline:** Assign a **Date/Date Range** AND a realistic **Time Allocation** (e.g., 3 hrs, 1.5 hrs) to *every single step*.
    4.  **Logic:** Start the plan **tomorrow**. Target completion **1-2 days before** the due date, or within a concise 10-day window if no due date is specified.
    5.  **Format:** Output **ONLY** the plan in a clear, formatted list/table structure. Do not add any introductory or conversational text.

    Generate the detailed plan now.
    """

    # 4. Configure generation parameters
    generation_config = genai.types.GenerationConfig(
        temperature=0.5,
        top_p=0.9,
        max_output_tokens=8192
    )

    # 5. Call the API
    print("Generating plan...")
    try:
        response = model.generate_content(
            prompt,
            generation_config=generation_config
        )
        return response.text
    except Exception as e:
        if "API_KEY_INVALID" in str(e):
            print("Error: Your API key is invalid. Please check it at https://ai.google.dev")
        else:
            print(f"An error occurred during API call: {e}")
        return f"Error: Failed to generate content. {e}"

# --- Main execution block to test the function ---
if __name__ == "__main__":
    if API_KEY == "YOUR_API_KEY_HERE":
        print("="*50)
        print("ERROR: Please update the 'API_KEY' variable in the script")
        print("       Get your key from https://ai.google.dev")
        print("="*50)
    else:
        try:
            # 1. Initialize Gemini
            init_gemini(API_KEY)

            # 2. Define an example assignment description
            example_assignment = """
            Course: ECON 410 - International Trade
            Task: Write a 2,500-word research paper on the economic impact 
                  of Brexit on small and medium-sized enterprises (SMEs) in the UK.
            Requirements: Must use at least 10 peer-reviewed academic sources, 
                          include quantitative data analysis, and a literature review.
            Due Date: November 10th
            """

            # 3. Generate the plan
            assignment_plan = create_assignment_plan(example_assignment)

            # 4. Print the result
            print("\n--- Generated Assignment Plan ---")
            print(assignment_plan)
            print("---------------------------------\n")

        except Exception as e:
            print(f"Script failed to run: {e}")
