-- QMSDesk Seed Data Validation Script
-- This script validates the seed data for data integrity and constraint compliance

-- Check for data type and constraint violations
DO $$
DECLARE
    violation_count INTEGER := 0;
    error_message TEXT := '';
BEGIN
    RAISE NOTICE 'Starting seed data validation...';
    
    -- 1. Check for NULL values in NOT NULL columns
    -- Organizations
    IF EXISTS (SELECT 1 FROM organizations WHERE name IS NULL OR slug IS NULL) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Organizations: Found NULL values in required fields (name, slug)' || E'\n';
    END IF;
    
    -- Profiles
    IF EXISTS (SELECT 1 FROM profiles WHERE organization_id IS NULL OR email IS NULL OR first_name IS NULL OR last_name IS NULL) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Profiles: Found NULL values in required fields' || E'\n';
    END IF;
    
    -- Documents
    IF EXISTS (SELECT 1 FROM documents WHERE organization_id IS NULL OR title IS NULL OR document_number IS NULL OR version IS NULL OR document_type IS NULL OR status IS NULL OR created_by IS NULL) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Documents: Found NULL values in required fields' || E'\n';
    END IF;
    
    -- Quality Events
    IF EXISTS (SELECT 1 FROM quality_events WHERE organization_id IS NULL OR event_number IS NULL OR title IS NULL OR description IS NULL OR event_type IS NULL OR severity IS NULL OR status IS NULL OR reported_by IS NULL OR reported_date IS NULL) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Quality Events: Found NULL values in required fields' || E'\n';
    END IF;
    
    -- CAPAs
    IF EXISTS (SELECT 1 FROM capas WHERE organization_id IS NULL OR capa_number IS NULL OR title IS NULL OR description IS NULL OR source_type IS NULL OR source_id IS NULL OR status IS NULL OR priority IS NULL OR assigned_to IS NULL OR created_by IS NULL) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'CAPAs: Found NULL values in required fields' || E'\n';
    END IF;
    
    -- Change Controls
    IF EXISTS (SELECT 1 FROM change_controls WHERE organization_id IS NULL OR change_number IS NULL OR title IS NULL OR description IS NULL OR change_type IS NULL OR status IS NULL OR priority IS NULL OR requested_by IS NULL) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Change Controls: Found NULL values in required fields' || E'\n';
    END IF;
    
    -- Tasks
    IF EXISTS (SELECT 1 FROM tasks WHERE organization_id IS NULL OR title IS NULL OR type IS NULL OR status IS NULL OR priority IS NULL OR assigned_to IS NULL OR created_by IS NULL) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Tasks: Found NULL values in required fields' || E'\n';
    END IF;
    
    -- Audit Logs
    IF EXISTS (SELECT 1 FROM audit_logs WHERE organization_id IS NULL OR user_id IS NULL OR action IS NULL OR table_name IS NULL OR record_id IS NULL) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Audit Logs: Found NULL values in required fields' || E'\n';
    END IF;
    
    -- 2. Check for foreign key violations
    -- Profiles -> Organizations
    IF EXISTS (SELECT 1 FROM profiles WHERE organization_id NOT IN (SELECT id FROM organizations)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Profiles: Found invalid organization_id references' || E'\n';
    END IF;
    
    -- User Roles -> Profiles & Organizations
    IF EXISTS (SELECT 1 FROM user_roles WHERE user_id NOT IN (SELECT id FROM profiles)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'User Roles: Found invalid user_id references' || E'\n';
    END IF;
    
    IF EXISTS (SELECT 1 FROM user_roles WHERE organization_id NOT IN (SELECT id FROM organizations)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'User Roles: Found invalid organization_id references' || E'\n';
    END IF;
    
    -- Documents -> Organizations & Profiles
    IF EXISTS (SELECT 1 FROM documents WHERE organization_id NOT IN (SELECT id FROM organizations)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Documents: Found invalid organization_id references' || E'\n';
    END IF;
    
    IF EXISTS (SELECT 1 FROM documents WHERE created_by NOT IN (SELECT id FROM profiles)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Documents: Found invalid created_by references' || E'\n';
    END IF;
    
    IF EXISTS (SELECT 1 FROM documents WHERE approved_by IS NOT NULL AND approved_by NOT IN (SELECT id FROM profiles)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Documents: Found invalid approved_by references' || E'\n';
    END IF;
    
    -- Quality Events -> Organizations & Profiles
    IF EXISTS (SELECT 1 FROM quality_events WHERE organization_id NOT IN (SELECT id FROM organizations)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Quality Events: Found invalid organization_id references' || E'\n';
    END IF;
    
    IF EXISTS (SELECT 1 FROM quality_events WHERE reported_by NOT IN (SELECT id FROM profiles)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Quality Events: Found invalid reported_by references' || E'\n';
    END IF;
    
    IF EXISTS (SELECT 1 FROM quality_events WHERE assigned_to IS NOT NULL AND assigned_to NOT IN (SELECT id FROM profiles)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Quality Events: Found invalid assigned_to references' || E'\n';
    END IF;
    
    -- CAPAs -> Organizations & Profiles
    IF EXISTS (SELECT 1 FROM capas WHERE organization_id NOT IN (SELECT id FROM organizations)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'CAPAs: Found invalid organization_id references' || E'\n';
    END IF;
    
    IF EXISTS (SELECT 1 FROM capas WHERE assigned_to NOT IN (SELECT id FROM profiles)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'CAPAs: Found invalid assigned_to references' || E'\n';
    END IF;
    
    IF EXISTS (SELECT 1 FROM capas WHERE created_by NOT IN (SELECT id FROM profiles)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'CAPAs: Found invalid created_by references' || E'\n';
    END IF;
    
    -- Change Controls -> Organizations & Profiles
    IF EXISTS (SELECT 1 FROM change_controls WHERE organization_id NOT IN (SELECT id FROM organizations)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Change Controls: Found invalid organization_id references' || E'\n';
    END IF;
    
    IF EXISTS (SELECT 1 FROM change_controls WHERE requested_by NOT IN (SELECT id FROM profiles)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Change Controls: Found invalid requested_by references' || E'\n';
    END IF;
    
    IF EXISTS (SELECT 1 FROM change_controls WHERE approved_by IS NOT NULL AND approved_by NOT IN (SELECT id FROM profiles)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Change Controls: Found invalid approved_by references' || E'\n';
    END IF;
    
    -- Tasks -> Organizations & Profiles
    IF EXISTS (SELECT 1 FROM tasks WHERE organization_id NOT IN (SELECT id FROM organizations)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Tasks: Found invalid organization_id references' || E'\n';
    END IF;
    
    IF EXISTS (SELECT 1 FROM tasks WHERE assigned_to NOT IN (SELECT id FROM profiles)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Tasks: Found invalid assigned_to references' || E'\n';
    END IF;
    
    IF EXISTS (SELECT 1 FROM tasks WHERE created_by NOT IN (SELECT id FROM profiles)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Tasks: Found invalid created_by references' || E'\n';
    END IF;
    
    -- Audit Logs -> Organizations & Profiles
    IF EXISTS (SELECT 1 FROM audit_logs WHERE organization_id NOT IN (SELECT id FROM organizations)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Audit Logs: Found invalid organization_id references' || E'\n';
    END IF;
    
    IF EXISTS (SELECT 1 FROM audit_logs WHERE user_id NOT IN (SELECT id FROM profiles)) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Audit Logs: Found invalid user_id references' || E'\n';
    END IF;
    
    -- 3. Check for unique constraint violations
    -- Organizations slug uniqueness
    IF EXISTS (SELECT slug, COUNT(*) FROM organizations GROUP BY slug HAVING COUNT(*) > 1) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Organizations: Found duplicate slug values' || E'\n';
    END IF;
    
    -- Documents uniqueness (organization_id, document_number, version)
    IF EXISTS (SELECT organization_id, document_number, version, COUNT(*) FROM documents GROUP BY organization_id, document_number, version HAVING COUNT(*) > 1) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Documents: Found duplicate (organization_id, document_number, version) combinations' || E'\n';
    END IF;
    
    -- Quality Events uniqueness (organization_id, event_number)
    IF EXISTS (SELECT organization_id, event_number, COUNT(*) FROM quality_events GROUP BY organization_id, event_number HAVING COUNT(*) > 1) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Quality Events: Found duplicate (organization_id, event_number) combinations' || E'\n';
    END IF;
    
    -- CAPAs uniqueness (organization_id, capa_number)
    IF EXISTS (SELECT organization_id, capa_number, COUNT(*) FROM capas GROUP BY organization_id, capa_number HAVING COUNT(*) > 1) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'CAPAs: Found duplicate (organization_id, capa_number) combinations' || E'\n';
    END IF;
    
    -- Change Controls uniqueness (organization_id, change_number)
    IF EXISTS (SELECT organization_id, change_number, COUNT(*) FROM change_controls GROUP BY organization_id, change_number HAVING COUNT(*) > 1) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Change Controls: Found duplicate (organization_id, change_number) combinations' || E'\n';
    END IF;
    
    -- User Roles uniqueness (user_id, role, organization_id)
    IF EXISTS (SELECT user_id, role, organization_id, COUNT(*) FROM user_roles GROUP BY user_id, role, organization_id HAVING COUNT(*) > 1) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'User Roles: Found duplicate (user_id, role, organization_id) combinations' || E'\n';
    END IF;
    
    -- 4. Check for invalid enum values
    -- Document status
    IF EXISTS (SELECT 1 FROM documents WHERE status NOT IN ('draft', 'pending_review', 'pending_approval', 'approved', 'effective', 'superseded', 'archived')) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Documents: Found invalid status values' || E'\n';
    END IF;
    
    -- Quality Event status
    IF EXISTS (SELECT 1 FROM quality_events WHERE status NOT IN ('open', 'under_investigation', 'pending_approval', 'closed', 'cancelled')) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Quality Events: Found invalid status values' || E'\n';
    END IF;
    
    -- Quality Event severity
    IF EXISTS (SELECT 1 FROM quality_events WHERE severity NOT IN ('low', 'medium', 'high', 'critical')) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Quality Events: Found invalid severity values' || E'\n';
    END IF;
    
    -- CAPA status
    IF EXISTS (SELECT 1 FROM capas WHERE status NOT IN ('draft', 'investigation', 'action_plan', 'implementation', 'effectiveness_check', 'closed', 'cancelled')) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'CAPAs: Found invalid status values' || E'\n';
    END IF;
    
    -- CAPA priority
    IF EXISTS (SELECT 1 FROM capas WHERE priority NOT IN ('low', 'medium', 'high', 'critical')) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'CAPAs: Found invalid priority values' || E'\n';
    END IF;
    
    -- Change Control status
    IF EXISTS (SELECT 1 FROM change_controls WHERE status NOT IN ('draft', 'pending_review', 'pending_approval', 'approved', 'implemented', 'closed', 'cancelled')) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Change Controls: Found invalid status values' || E'\n';
    END IF;
    
    -- Change Control priority
    IF EXISTS (SELECT 1 FROM change_controls WHERE priority NOT IN ('low', 'medium', 'high', 'critical')) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Change Controls: Found invalid priority values' || E'\n';
    END IF;
    
    -- Task status
    IF EXISTS (SELECT 1 FROM tasks WHERE status NOT IN ('pending', 'in_progress', 'completed', 'cancelled')) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Tasks: Found invalid status values' || E'\n';
    END IF;
    
    -- Task priority
    IF EXISTS (SELECT 1 FROM tasks WHERE priority NOT IN ('low', 'medium', 'high', 'critical')) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Tasks: Found invalid priority values' || E'\n';
    END IF;
    
    -- Task type
    IF EXISTS (SELECT 1 FROM tasks WHERE type NOT IN ('review', 'approval', 'investigation', 'implementation', 'training', 'other')) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Tasks: Found invalid type values' || E'\n';
    END IF;
    
    -- 5. Check for data length violations
    -- Organization name (VARCHAR(255))
    IF EXISTS (SELECT 1 FROM organizations WHERE LENGTH(name) > 255) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Organizations: Found name values exceeding 255 characters' || E'\n';
    END IF;
    
    -- Organization slug (VARCHAR(100))
    IF EXISTS (SELECT 1 FROM organizations WHERE LENGTH(slug) > 100) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Organizations: Found slug values exceeding 100 characters' || E'\n';
    END IF;
    
    -- Profile email (VARCHAR(255))
    IF EXISTS (SELECT 1 FROM profiles WHERE LENGTH(email) > 255) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Profiles: Found email values exceeding 255 characters' || E'\n';
    END IF;
    
    -- Profile first_name (VARCHAR(100))
    IF EXISTS (SELECT 1 FROM profiles WHERE LENGTH(first_name) > 100) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Profiles: Found first_name values exceeding 100 characters' || E'\n';
    END IF;
    
    -- Profile last_name (VARCHAR(100))
    IF EXISTS (SELECT 1 FROM profiles WHERE LENGTH(last_name) > 100) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Profiles: Found last_name values exceeding 100 characters' || E'\n';
    END IF;
    
    -- Profile phone (VARCHAR(20))
    IF EXISTS (SELECT 1 FROM profiles WHERE LENGTH(phone) > 20) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Profiles: Found phone values exceeding 20 characters' || E'\n';
    END IF;
    
    -- Document title (VARCHAR(255))
    IF EXISTS (SELECT 1 FROM documents WHERE LENGTH(title) > 255) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Documents: Found title values exceeding 255 characters' || E'\n';
    END IF;
    
    -- Document number (VARCHAR(50))
    IF EXISTS (SELECT 1 FROM documents WHERE LENGTH(document_number) > 50) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Documents: Found document_number values exceeding 50 characters' || E'\n';
    END IF;
    
    -- Document version (VARCHAR(20))
    IF EXISTS (SELECT 1 FROM documents WHERE LENGTH(version) > 20) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Documents: Found version values exceeding 20 characters' || E'\n';
    END IF;
    
    -- Document type (VARCHAR(50))
    IF EXISTS (SELECT 1 FROM documents WHERE LENGTH(document_type) > 50) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Documents: Found document_type values exceeding 50 characters' || E'\n';
    END IF;
    
    -- Document status (VARCHAR(20))
    IF EXISTS (SELECT 1 FROM documents WHERE LENGTH(status) > 20) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Documents: Found status values exceeding 20 characters' || E'\n';
    END IF;
    
    -- 6. Check for logical inconsistencies
    -- Documents: effective_date should be set when status is 'effective'
    IF EXISTS (SELECT 1 FROM documents WHERE status = 'effective' AND effective_date IS NULL) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Documents: Found effective documents without effective_date' || E'\n';
    END IF;
    
    -- Quality Events: closed_date should be set when status is 'closed'
    IF EXISTS (SELECT 1 FROM quality_events WHERE status = 'closed' AND closed_date IS NULL) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Quality Events: Found closed events without closed_date' || E'\n';
    END IF;
    
    -- CAPAs: completed_date should be set when status is 'closed'
    IF EXISTS (SELECT 1 FROM capas WHERE status = 'closed' AND completed_date IS NULL) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'CAPAs: Found closed CAPAs without completed_date' || E'\n';
    END IF;
    
    -- Change Controls: completed_date should be set when status is 'implemented' or 'closed'
    IF EXISTS (SELECT 1 FROM change_controls WHERE status IN ('implemented', 'closed') AND completed_date IS NULL) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Change Controls: Found implemented/closed changes without completed_date' || E'\n';
    END IF;
    
    -- Tasks: completed_date should be set when status is 'completed'
    IF EXISTS (SELECT 1 FROM tasks WHERE status = 'completed' AND completed_date IS NULL) THEN
        violation_count := violation_count + 1;
        error_message := error_message || 'Tasks: Found completed tasks without completed_date' || E'\n';
    END IF;
    
    -- 7. Report results
    IF violation_count = 0 THEN
        RAISE NOTICE 'SUCCESS: All seed data validation checks passed!';
        RAISE NOTICE 'No data type violations, constraint violations, or logical inconsistencies found.';
    ELSE
        RAISE EXCEPTION 'VALIDATION FAILED: Found % violations:%', violation_count, E'\n' || error_message;
    END IF;
    
END $$;

-- Display record counts for verification
SELECT 
    'Organizations' as table_name, 
    COUNT(*) as record_count,
    'Expected: 3' as expected
FROM organizations
UNION ALL
SELECT 
    'Profiles' as table_name, 
    COUNT(*) as record_count,
    'Expected: 12' as expected
FROM profiles
UNION ALL
SELECT 
    'User Roles' as table_name, 
    COUNT(*) as record_count,
    'Expected: 12' as expected
FROM user_roles
UNION ALL
SELECT 
    'Documents' as table_name, 
    COUNT(*) as record_count,
    'Expected: 9' as expected
FROM documents
UNION ALL
SELECT 
    'Quality Events' as table_name, 
    COUNT(*) as record_count,
    'Expected: 5' as expected
FROM quality_events
UNION ALL
SELECT 
    'CAPAs' as table_name, 
    COUNT(*) as record_count,
    'Expected: 5' as expected
FROM capas
UNION ALL
SELECT 
    'Change Controls' as table_name, 
    COUNT(*) as record_count,
    'Expected: 5' as expected
FROM change_controls
UNION ALL
SELECT 
    'Tasks' as table_name, 
    COUNT(*) as record_count,
    'Expected: 6' as expected
FROM tasks
UNION ALL
SELECT 
    'Audit Logs' as table_name, 
    COUNT(*) as record_count,
    'Expected: 5' as expected
FROM audit_logs
ORDER BY table_name;
