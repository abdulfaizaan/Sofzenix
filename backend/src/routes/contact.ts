import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabaseAdmin } from "../lib/supabase";

export const contactRouter = Router();

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  service: z.string().min(1, "Please select an area of interest."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

contactRouter.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const validatedData = ContactSchema.parse(req.body);

    const { error } = await supabaseAdmin
      .from("contacts")
      .insert([
        {
          name: validatedData.name,
          email: validatedData.email,
          service: validatedData.service,
          message: validatedData.message,
          status: "new",
        },
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: "Failed to save contact submission." });
    }

    return res.status(200).json({ success: true, message: "Contact saved." });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation failed", details: err.issues });
    }
    console.error("Contact route error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
