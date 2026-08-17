REVOKE EXECUTE ON FUNCTION public.handle_new_user_role() FROM anon, authenticated, public;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace WHERE n.nspname='public' AND p.proname='update_updated_at_column') THEN
    EXECUTE 'REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public';
  END IF;
END $$;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;