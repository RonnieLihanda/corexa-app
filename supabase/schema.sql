create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  business_name text not null default '',
  business_type text not null default '',
  funding_amount numeric not null default 0,
  role text not null default 'client' check (role in ('admin', 'client')),
  created_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  business_name text not null,
  contact_email text not null,
  industry text not null default 'AI Technology',
  onboarding_status text not null default 'in_progress' check (onboarding_status in ('not_started', 'in_progress', 'complete')),
  onboarding_pct integer not null default 0 check (onboarding_pct between 0 and 100),
  health_score integer not null default 80 check (health_score between 0 and 100),
  last_activity timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  name text not null,
  email text not null,
  company text,
  source text not null default 'Form Builder Submission',
  score integer not null default 60 check (score between 0 and 100),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'lost')),
  funding_amount numeric not null default 0,
  sector text not null default 'Technology',
  created_at timestamptz not null default now()
);

create table if not exists public.content_queue (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  platform text not null,
  topic text not null,
  generated_content text not null,
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published')),
  scheduled_date timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.email_sequences (
  id uuid primary key default gen_random_uuid(),
  client_id text not null,
  sequence_type text not null,
  day_number integer not null default 0,
  subject text not null,
  body text not null,
  status text not null default 'sent',
  sent_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.nps_surveys (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  score integer not null check (score between 0 and 10),
  feedback text,
  sent_at timestamptz not null default now(),
  responded_at timestamptz
);

alter table public.users enable row level security;
alter table public.clients enable row level security;
alter table public.leads enable row level security;
alter table public.content_queue enable row level security;
alter table public.email_sequences enable row level security;
alter table public.nps_surveys enable row level security;

create policy "Users can read own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.users for insert with check (auth.uid() = id);

create policy "Authenticated users can manage clients" on public.clients for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users can manage leads" on public.leads for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users can manage content" on public.content_queue for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users can manage email sequences" on public.email_sequences for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users can manage nps surveys" on public.nps_surveys for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
