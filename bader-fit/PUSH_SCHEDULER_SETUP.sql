-- FORM / ONE background Web Push scheduler (execute in Supabase SQL Editor as project owner).
-- VAPID and cron authorization secrets are already stored in Supabase Vault.
-- This does not change the existing health-sync function.
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

SELECT cron.schedule(
  'formone-push-worker',
  '* * * * *',
  $job$
    SELECT net.http_post(
      url := 'https://nxbciyowueonezkxohmb.supabase.co/functions/v1/formone-push',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-push-cron',
        (SELECT decrypted_secret FROM vault.decrypted_secrets
         WHERE name = 'formone_push_cron_token' LIMIT 1)
      ),
      body := '{"action":"tick"}'::jsonb,
      timeout_milliseconds := 15000
    );
  $job$
);
-- Verify: SELECT jobid,jobname,schedule,active FROM cron.job WHERE jobname='formone-push-worker';
-- This runs once per minute; push delivery timing itself is controlled by Apple/browser push services.
