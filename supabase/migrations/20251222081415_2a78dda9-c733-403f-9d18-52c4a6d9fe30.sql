-- Create interaction_history table for storing past analyses
CREATE TABLE public.interaction_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  drugs TEXT[] NOT NULL DEFAULT '{}'::text[],
  analysis_result JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.interaction_history ENABLE ROW LEVEL SECURITY;

-- RLS policies for interaction_history
CREATE POLICY "Users can view their own interaction history"
ON public.interaction_history
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own interaction history"
ON public.interaction_history
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interaction history"
ON public.interaction_history
FOR DELETE
USING (auth.uid() = user_id);

-- Create medication_dosages table for tracking dosages
CREATE TABLE public.medication_dosages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  drug_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  notes TEXT,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.medication_dosages ENABLE ROW LEVEL SECURITY;

-- RLS policies for medication_dosages
CREATE POLICY "Users can view their own dosages"
ON public.medication_dosages
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own dosages"
ON public.medication_dosages
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own dosages"
ON public.medication_dosages
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own dosages"
ON public.medication_dosages
FOR DELETE
USING (auth.uid() = user_id);

-- Add trigger for updated_at on medication_dosages
CREATE TRIGGER update_medication_dosages_updated_at
BEFORE UPDATE ON public.medication_dosages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();