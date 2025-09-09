-- QMSDesk Seed Data - Fixed UUID Format
-- This file contains comprehensive seed data with properly formatted UUIDs

-- Clear existing data (in correct order due to foreign key constraints)
-- This ensures a clean slate for seeding

-- Disable foreign key checks temporarily for faster deletion
SET session_replication_role = replica;

-- Delete all data in reverse dependency order
DELETE FROM audit_logs;
DELETE FROM tasks;
DELETE FROM change_controls;
DELETE FROM capas;
DELETE FROM quality_events;
DELETE FROM documents;
DELETE FROM user_roles;
DELETE FROM profiles;
DELETE FROM organizations;

-- Re-enable foreign key checks
SET session_replication_role = DEFAULT;

-- Reset any sequences if they exist (though we're using UUIDs)
-- This is included for completeness in case any tables use serial columns
DO $$
DECLARE
    seq_name TEXT;
BEGIN
    -- Reset any sequences that might exist
    FOR seq_name IN 
        SELECT sequence_name 
        FROM information_schema.sequences 
        WHERE sequence_schema = 'public'
    LOOP
        EXECUTE 'ALTER SEQUENCE ' || seq_name || ' RESTART WITH 1';
    END LOOP;
END $$;

-- Insert Organizations
INSERT INTO organizations (id, name, slug, logo_url, settings) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'Acme Pharmaceuticals', 'acme-pharma', NULL, '{"timezone": "America/New_York", "date_format": "MM/DD/YYYY", "currency": "USD", "industry": "Pharmaceuticals"}'),
    ('550e8400-e29b-41d4-a716-446655440001', 'BioTech Solutions', 'biotech-solutions', NULL, '{"timezone": "America/Los_Angeles", "date_format": "DD/MM/YYYY", "currency": "USD", "industry": "Biotechnology"}'),
    ('550e8400-e29b-41d4-a716-446655440002', 'MedDevice Corp', 'meddevice-corp', NULL, '{"timezone": "Europe/London", "date_format": "DD/MM/YYYY", "currency": "EUR", "industry": "Medical Devices"}');

-- Insert User Profiles
-- Note: These would normally be created through Supabase Auth, but for seeding we'll create them directly
-- IMPORTANT: In a real scenario, you would need to create auth.users first, then profiles
-- For seeding purposes, we'll disable the foreign key constraint temporarily
SET session_replication_role = replica;

INSERT INTO profiles (id, organization_id, email, first_name, last_name, job_title, department, phone, is_active, last_login, created_at, updated_at) VALUES
    -- Acme Pharmaceuticals Users
    ('11111111-1111-1111-1111-111111111111', '550e8400-e29b-41d4-a716-446655440000', 'admin@acmepharma.com', 'John', 'Smith', 'Quality Director', 'Quality Assurance', '+1-555-0101', true, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '30 days', NOW() - INTERVAL '2 hours'),
    ('22222222-2222-2222-2222-222222222222', '550e8400-e29b-41d4-a716-446655440000', 'manager@acmepharma.com', 'Sarah', 'Johnson', 'Quality Manager', 'Quality Assurance', '+1-555-0102', true, NOW() - INTERVAL '1 hour', NOW() - INTERVAL '25 days', NOW() - INTERVAL '1 hour'),
    ('33333333-3333-3333-3333-333333333333', '550e8400-e29b-41d4-a716-446655440000', 'reviewer@acmepharma.com', 'Mike', 'Chen', 'QA Reviewer', 'Quality Assurance', '+1-555-0103', true, NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '20 days', NOW() - INTERVAL '30 minutes'),
    ('44444444-4444-4444-4444-444444444444', '550e8400-e29b-41d4-a716-446655440000', 'doc@acmepharma.com', 'Emily', 'Davis', 'Document Controller', 'Quality Assurance', '+1-555-0104', true, NOW() - INTERVAL '15 minutes', NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 minutes'),
    ('55555555-5555-5555-5555-555555555555', '550e8400-e29b-41d4-a716-446655440000', 'capa@acmepharma.com', 'David', 'Wilson', 'CAPA Investigator', 'Quality Assurance', '+1-555-0105', true, NOW() - INTERVAL '45 minutes', NOW() - INTERVAL '10 days', NOW() - INTERVAL '45 minutes'),
    ('66666666-6666-6666-6666-666666666666', '550e8400-e29b-41d4-a716-446655440000', 'lab@acmepharma.com', 'Lisa', 'Brown', 'Lab Technician', 'Laboratory', '+1-555-0106', true, NOW() - INTERVAL '1 day', NOW() - INTERVAL '5 days', NOW() - INTERVAL '1 day'),
    ('77777777-7777-7777-7777-777777777777', '550e8400-e29b-41d4-a716-446655440000', 'prod@acmepharma.com', 'Robert', 'Taylor', 'Production Supervisor', 'Production', '+1-555-0107', true, NOW() - INTERVAL '2 days', NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days'),
    
    -- BioTech Solutions Users
    ('88888888-8888-8888-8888-888888888888', '550e8400-e29b-41d4-a716-446655440001', 'admin@biotechsolutions.com', 'Jennifer', 'Garcia', 'Quality Director', 'Quality Assurance', '+1-555-0201', true, NOW() - INTERVAL '3 hours', NOW() - INTERVAL '28 days', NOW() - INTERVAL '3 hours'),
    ('99999999-9999-9999-9999-999999999999', '550e8400-e29b-41d4-a716-446655440001', 'manager@biotechsolutions.com', 'Michael', 'Martinez', 'Quality Manager', 'Quality Assurance', '+1-555-0202', true, NOW() - INTERVAL '4 hours', NOW() - INTERVAL '22 days', NOW() - INTERVAL '4 hours'),
    ('10101010-1010-1010-1010-101010101010', '550e8400-e29b-41d4-a716-446655440001', 'user@biotechsolutions.com', 'Amanda', 'Anderson', 'Research Scientist', 'Research & Development', '+1-555-0203', true, NOW() - INTERVAL '5 hours', NOW() - INTERVAL '18 days', NOW() - INTERVAL '5 hours'),
    
    -- MedDevice Corp Users
    ('20202020-2020-2020-2020-202020202020', '550e8400-e29b-41d4-a716-446655440002', 'admin@meddevice.com', 'James', 'Wilson', 'Quality Director', 'Quality Assurance', '+44-20-7946-0958', true, NOW() - INTERVAL '6 hours', NOW() - INTERVAL '12 days', NOW() - INTERVAL '6 hours'),
    ('30303030-3030-3030-3030-303030303030', '550e8400-e29b-41d4-a716-446655440002', 'engineer@meddevice.com', 'Sophie', 'Thompson', 'Quality Engineer', 'Quality Assurance', '+44-20-7946-0959', true, NOW() - INTERVAL '7 hours', NOW() - INTERVAL '8 days', NOW() - INTERVAL '7 hours');

-- Re-enable foreign key constraints
SET session_replication_role = DEFAULT;

-- Insert User Roles
INSERT INTO user_roles (user_id, role, organization_id) VALUES
    -- Acme Pharmaceuticals Roles
    ('11111111-1111-1111-1111-111111111111', 'organization_admin', '550e8400-e29b-41d4-a716-446655440000'),
    ('22222222-2222-2222-2222-222222222222', 'quality_manager', '550e8400-e29b-41d4-a716-446655440000'),
    ('33333333-3333-3333-3333-333333333333', 'qa_reviewer', '550e8400-e29b-41d4-a716-446655440000'),
    ('44444444-4444-4444-4444-444444444444', 'document_controller', '550e8400-e29b-41d4-a716-446655440000'),
    ('55555555-5555-5555-5555-555555555555', 'capa_owner', '550e8400-e29b-41d4-a716-446655440000'),
    ('66666666-6666-6666-6666-666666666666', 'general_user', '550e8400-e29b-41d4-a716-446655440000'),
    ('77777777-7777-7777-7777-777777777777', 'department_head', '550e8400-e29b-41d4-a716-446655440000'),
    
    -- BioTech Solutions Roles
    ('88888888-8888-8888-8888-888888888888', 'organization_admin', '550e8400-e29b-41d4-a716-446655440001'),
    ('99999999-9999-9999-9999-999999999999', 'quality_manager', '550e8400-e29b-41d4-a716-446655440001'),
    ('10101010-1010-1010-1010-101010101010', 'general_user', '550e8400-e29b-41d4-a716-446655440001'),
    
    -- MedDevice Corp Roles
    ('20202020-2020-2020-2020-202020202020', 'organization_admin', '550e8400-e29b-41d4-a716-446655440002'),
    ('30303030-3030-3030-3030-303030303030', 'quality_manager', '550e8400-e29b-41d4-a716-446655440002');

-- Insert Documents
INSERT INTO documents (id, organization_id, title, document_number, version, document_type, status, content, effective_date, review_date, created_by, approved_by, created_at, updated_at) VALUES
    -- Acme Pharmaceuticals Documents
    ('40404040-4040-4040-4040-404040404040', '550e8400-e29b-41d4-a716-446655440000', 'Standard Operating Procedure - Equipment Calibration', 'SOP-001', '2.1', 'SOP', 'effective', 'This SOP describes the procedures for calibrating laboratory equipment...', '2024-01-15', '2025-01-15', '44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', '2024-01-10 10:00:00', '2024-01-15 14:30:00'),
    ('50505050-5050-5050-5050-505050505050', '550e8400-e29b-41d4-a716-446655440000', 'Quality Policy Manual', 'QPM-001', '1.0', 'Policy', 'pending_approval', 'This document outlines the quality policy and objectives...', '2024-02-01', '2025-02-01', '44444444-4444-4444-4444-444444444444', NULL, '2024-01-20 09:00:00', '2024-01-25 16:45:00'),
    ('60606060-6060-6060-6060-606060606060', '550e8400-e29b-41d4-a716-446655440000', 'Training Record Template', 'TRT-001', '1.2', 'Template', 'draft', 'Template for recording employee training activities...', NULL, NULL, '44444444-4444-4444-4444-444444444444', NULL, '2024-01-28 11:20:00', '2024-01-30 13:15:00'),
    ('70707070-7070-7070-7070-707070707070', '550e8400-e29b-41d4-a716-446655440000', 'Batch Manufacturing Record', 'BMR-001', '1.0', 'Form', 'effective', 'Standard form for recording batch manufacturing data...', '2024-01-01', '2025-01-01', '44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', '2023-12-15 08:00:00', '2024-01-01 10:00:00'),
    ('80808080-8080-8080-8080-808080808080', '550e8400-e29b-41d4-a716-446655440000', 'Laboratory Safety Manual', 'LSM-001', '3.0', 'Manual', 'effective', 'Comprehensive safety procedures for laboratory operations...', '2024-01-10', '2025-01-10', '44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', '2024-01-05 14:00:00', '2024-01-10 09:00:00'),
    
    -- BioTech Solutions Documents
    ('90909090-9090-9090-9090-909090909090', '550e8400-e29b-41d4-a716-446655440001', 'Research Protocol Template', 'RPT-001', '1.0', 'Template', 'effective', 'Standard template for research protocols...', '2024-01-20', '2025-01-20', '88888888-8888-8888-8888-888888888888', '99999999-9999-9999-9999-999999999999', '2024-01-15 10:00:00', '2024-01-20 11:00:00'),
    ('12121212-1212-1212-1212-121212121212', '550e8400-e29b-41d4-a716-446655440001', 'Data Integrity Policy', 'DIP-001', '2.0', 'Policy', 'pending_review', 'Policy for maintaining data integrity in research...', '2024-02-15', '2025-02-15', '88888888-8888-8888-8888-888888888888', NULL, '2024-01-25 15:00:00', '2024-01-30 12:00:00'),
    
    -- MedDevice Corp Documents
    ('13131313-1313-1313-1313-131313131313', '550e8400-e29b-41d4-a716-446655440002', 'Device Design Control Procedure', 'DCP-001', '1.0', 'SOP', 'effective', 'Standard operating procedure for device design control...', '2024-01-10', '2025-01-10', '20202020-2020-2020-2020-202020202020', '30303030-3030-3030-3030-303030303030', '2024-01-05 09:00:00', '2024-01-10 10:00:00'),
    ('14141414-1414-1414-1414-141414141414', '550e8400-e29b-41d4-a716-446655440002', 'Risk Management Plan', 'RMP-001', '2.1', 'Plan', 'pending_approval', 'Risk management plan for medical device development...', '2024-02-01', '2025-02-01', '30303030-3030-3030-3030-303030303030', NULL, '2024-01-20 14:00:00', '2024-01-25 16:00:00');

-- Insert Quality Events
INSERT INTO quality_events (id, organization_id, event_number, title, description, event_type, severity, status, reported_by, assigned_to, reported_date, due_date, closed_date, created_at, updated_at) VALUES
    -- Acme Pharmaceuticals Events
    ('15151515-1515-1515-1515-151515151515', '550e8400-e29b-41d4-a716-446655440000', 'QE-2024-001', 'Temperature Deviation in Storage Room A', 'Temperature exceeded acceptable range (2-8°C) during routine monitoring. Peak temperature reached 12°C for 2 hours.', 'Deviation', 'medium', 'open', '66666666-6666-6666-6666-666666666666', '55555555-5555-5555-5555-555555555555', '2024-01-15', '2024-01-22', NULL, '2024-01-15 10:00:00', '2024-01-15 10:00:00'),
    ('16161616-1616-1616-1616-161616161616', '550e8400-e29b-41d4-a716-446655440000', 'QE-2024-002', 'Equipment Calibration Overdue', 'Balance calibration due date has passed without completion. Equipment ID: BAL-001, Due: 2024-01-10', 'Non-conformance', 'high', 'under_investigation', '33333333-3333-3333-3333-333333333333', '55555555-5555-5555-5555-555555555555', '2024-01-10', '2024-01-17', NULL, '2024-01-10 14:30:00', '2024-01-12 09:15:00'),
    ('17171717-1717-1717-1717-171717171717', '550e8400-e29b-41d4-a716-446655440000', 'QE-2024-003', 'Documentation Error in Batch Record', 'Incorrect entry found in batch manufacturing record BMR-2024-001. Batch number was recorded incorrectly.', 'Documentation Error', 'low', 'closed', '77777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', '2024-01-05', '2024-01-12', '2024-01-11', '2024-01-05 08:45:00', '2024-01-11 16:20:00'),
    ('18181818-1818-1818-1818-181818181818', '550e8400-e29b-41d4-a716-446655440000', 'QE-2024-004', 'Environmental Monitoring Alert', 'Particle count exceeded limits in cleanroom during production. Immediate action required.', 'Environmental', 'critical', 'pending_approval', '66666666-6666-6666-6666-666666666666', '22222222-2222-2222-2222-222222222222', '2024-01-20', '2024-01-22', NULL, '2024-01-20 11:30:00', '2024-01-21 14:00:00'),
    
    -- BioTech Solutions Events
    ('19191919-1919-1919-1919-191919191919', '550e8400-e29b-41d4-a716-446655440001', 'QE-2024-001', 'Research Data Anomaly', 'Unexpected results in research study RST-2024-001. Statistical analysis shows significant deviation from expected values.', 'Research Anomaly', 'medium', 'open', '10101010-1010-1010-1010-101010101010', '99999999-9999-9999-9999-999999999999', '2024-01-18', '2024-01-25', NULL, '2024-01-18 16:00:00', '2024-01-18 16:00:00');

-- Insert CAPAs
INSERT INTO capas (id, organization_id, capa_number, title, description, source_type, source_id, status, priority, assigned_to, due_date, completed_date, created_by, created_at, updated_at) VALUES
    -- Acme Pharmaceuticals CAPAs
    ('21212121-2121-2121-2121-212121212121', '550e8400-e29b-41d4-a716-446655440000', 'CAPA-2024-001', 'Improve Temperature Monitoring System', 'Implement automated temperature monitoring with alerts for Storage Room A to prevent future deviations', 'Quality Event', '15151515-1515-1515-1515-151515151515', 'implementation', 'high', '55555555-5555-5555-5555-555555555555', '2024-02-15', NULL, '22222222-2222-2222-2222-222222222222', '2024-01-20 10:00:00', '2024-01-25 14:30:00'),
    ('23232323-2323-2323-2323-232323232323', '550e8400-e29b-41d4-a716-446655440000', 'CAPA-2024-002', 'Enhanced Calibration Tracking', 'Develop systematic approach to equipment calibration scheduling and tracking to prevent overdue calibrations', 'Quality Event', '16161616-1616-1616-1616-161616161616', 'action_plan', 'medium', '55555555-5555-5555-5555-555555555555', '2024-02-10', NULL, '33333333-3333-3333-3333-333333333333', '2024-01-15 09:00:00', '2024-01-22 11:15:00'),
    ('24242424-2424-2424-2424-242424242424', '550e8400-e29b-41d4-a716-446655440000', 'CAPA-2024-003', 'Documentation Review Process', 'Implement peer review process for batch manufacturing records to reduce documentation errors', 'Quality Event', '17171717-1717-1717-1717-171717171717', 'closed', 'low', '33333333-3333-3333-3333-333333333333', '2024-01-25', '2024-01-24', '55555555-5555-5555-5555-555555555555', '2024-01-10 08:45:00', '2024-01-24 16:20:00'),
    ('25252525-2525-2525-2525-252525252525', '550e8400-e29b-41d4-a716-446655440000', 'CAPA-2024-004', 'Cleanroom Environmental Controls', 'Upgrade cleanroom environmental monitoring system and implement immediate alert protocols', 'Quality Event', '18181818-1818-1818-1818-181818181818', 'investigation', 'critical', '55555555-5555-5555-5555-555555555555', '2024-01-30', NULL, '22222222-2222-2222-2222-222222222222', '2024-01-21 14:00:00', '2024-01-22 10:00:00'),
    
    -- BioTech Solutions CAPAs
    ('26262626-2626-2626-2626-262626262626', '550e8400-e29b-41d4-a716-446655440001', 'CAPA-2024-001', 'Research Data Validation Process', 'Implement additional data validation steps in research protocols to identify anomalies earlier', 'Quality Event', '19191919-1919-1919-1919-191919191919', 'draft', 'medium', '99999999-9999-9999-9999-999999999999', '2024-02-20', NULL, '10101010-1010-1010-1010-101010101010', '2024-01-19 16:00:00', '2024-01-19 16:00:00');

-- Insert Change Controls
INSERT INTO change_controls (id, organization_id, change_number, title, description, change_type, status, priority, requested_by, approved_by, due_date, completed_date, created_at, updated_at) VALUES
    -- Acme Pharmaceuticals Changes
    ('27272727-2727-2727-2727-272727272727', '550e8400-e29b-41d4-a716-446655440000', 'CR-2024-001', 'Update Cleaning Procedure for Lab B', 'Modify the cleaning procedure to include new disinfectant requirements and extended contact time', 'Process Change', 'pending_approval', 'medium', '66666666-6666-6666-6666-666666666666', NULL, '2024-02-20', NULL, '2024-01-25 10:00:00', '2024-01-28 14:30:00'),
    ('28282828-2828-2828-2828-282828282828', '550e8400-e29b-41d4-a716-446655440000', 'CR-2024-002', 'Equipment Upgrade - Balance Replacement', 'Replace existing balance with new model requiring procedure updates and staff training', 'Equipment Change', 'approved', 'high', '33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', '2024-02-15', NULL, '2024-01-20 09:00:00', '2024-01-30 11:15:00'),
    ('29292929-2929-2929-2929-292929292929', '550e8400-e29b-41d4-a716-446655440000', 'CR-2024-003', 'Document Template Revision', 'Update batch record template to include new fields for enhanced traceability', 'Document Change', 'implemented', 'low', '44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', '2024-01-30', '2024-01-29', '2024-01-15 08:45:00', '2024-01-29 16:20:00'),
    ('31313131-3131-3131-3131-313131313131', '550e8400-e29b-41d4-a716-446655440000', 'CR-2024-004', 'Laboratory Information System Upgrade', 'Upgrade LIMS to version 3.0 with new features and improved data integrity controls', 'System Change', 'draft', 'high', '11111111-1111-1111-1111-111111111111', NULL, '2024-03-15', NULL, '2024-01-22 14:00:00', '2024-01-22 14:00:00'),
    
    -- BioTech Solutions Changes
    ('32323232-3232-3232-3232-323232323232', '550e8400-e29b-41d4-a716-446655440001', 'CR-2024-001', 'Research Protocol Standardization', 'Standardize research protocols across all projects to improve data consistency', 'Process Change', 'pending_review', 'medium', '10101010-1010-1010-1010-101010101010', NULL, '2024-02-25', NULL, '2024-01-20 15:00:00', '2024-01-25 12:00:00');

-- Insert Tasks
INSERT INTO tasks (id, organization_id, title, description, type, status, priority, assigned_to, due_date, completed_date, related_type, related_id, created_by, created_at, updated_at) VALUES
    -- Acme Pharmaceuticals Tasks
    ('34343434-3434-3434-3434-343434343434', '550e8400-e29b-41d4-a716-446655440000', 'Review SOP-001 v2.1', 'Review updated equipment calibration SOP for accuracy and completeness', 'review', 'completed', 'medium', '33333333-3333-3333-3333-333333333333', '2024-01-12', '2024-01-11', 'document', '40404040-4040-4040-4040-404040404040', '44444444-4444-4444-4444-444444444444', '2024-01-10 10:00:00', '2024-01-11 15:30:00'),
    ('35353535-3535-3535-3535-353535353535', '550e8400-e29b-41d4-a716-446655440000', 'Approve QPM-001 v1.0', 'Final approval required for Quality Policy Manual', 'approval', 'pending', 'high', '22222222-2222-2222-2222-222222222222', '2024-02-05', NULL, 'document', '50505050-5050-5050-5050-505050505050', '44444444-4444-4444-4444-444444444444', '2024-01-25 16:45:00', '2024-01-25 16:45:00'),
    ('36363636-3636-3636-3636-363636363636', '550e8400-e29b-41d4-a716-446655440000', 'Investigate Temperature Deviation', 'Complete root cause analysis for temperature deviation in Storage Room A', 'investigation', 'in_progress', 'high', '55555555-5555-5555-5555-555555555555', '2024-01-22', NULL, 'quality_event', '15151515-1515-1515-1515-151515151515', '66666666-6666-6666-6666-666666666666', '2024-01-15 10:00:00', '2024-01-18 14:20:00'),
    ('37373737-3737-3737-3737-373737373737', '550e8400-e29b-41d4-a716-446655440000', 'Implement Temperature Monitoring', 'Install automated temperature monitoring system in Storage Room A', 'implementation', 'pending', 'high', '55555555-5555-5555-5555-555555555555', '2024-02-15', NULL, 'capa', '21212121-2121-2121-2121-212121212121', '22222222-2222-2222-2222-222222222222', '2024-01-25 14:30:00', '2024-01-25 14:30:00'),
    ('38383838-3838-3838-3838-383838383838', '550e8400-e29b-41d4-a716-446655440000', 'Staff Training - New Balance', 'Train laboratory staff on new balance operation and maintenance', 'training', 'pending', 'medium', '66666666-6666-6666-6666-666666666666', '2024-02-20', NULL, 'change_control', '28282828-2828-2828-2828-282828282828', '33333333-3333-3333-3333-333333333333', '2024-01-30 11:15:00', '2024-01-30 11:15:00'),
    
    -- BioTech Solutions Tasks
    ('39393939-3939-3939-3939-393939393939', '550e8400-e29b-41d4-a716-446655440001', 'Review Research Data Anomaly', 'Investigate unexpected results in research study RST-2024-001', 'investigation', 'pending', 'medium', '99999999-9999-9999-9999-999999999999', '2024-01-25', NULL, 'quality_event', '19191919-1919-1919-1919-191919191919', '10101010-1010-1010-1010-101010101010', '2024-01-18 16:00:00', '2024-01-18 16:00:00');

-- Insert Audit Logs (sample entries)
INSERT INTO audit_logs (id, organization_id, user_id, action, table_name, record_id, old_values, new_values, ip_address, user_agent, created_at) VALUES
    ('41414141-4141-4141-4141-414141414141', '550e8400-e29b-41d4-a716-446655440000', '44444444-4444-4444-4444-444444444444', 'CREATE', 'documents', '40404040-4040-4040-4040-404040404040', NULL, '{"title": "Standard Operating Procedure - Equipment Calibration", "status": "draft"}', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '2024-01-10 10:00:00'),
    ('42424242-4242-4242-4242-424242424242', '550e8400-e29b-41d4-a716-446655440000', '22222222-2222-2222-2222-222222222222', 'UPDATE', 'documents', '40404040-4040-4040-4040-404040404040', '{"status": "pending_approval"}', '{"status": "effective"}', '192.168.1.101', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '2024-01-15 14:30:00'),
    ('43434343-4343-4343-4343-434343434343', '550e8400-e29b-41d4-a716-446655440000', '66666666-6666-6666-6666-666666666666', 'CREATE', 'quality_events', '15151515-1515-1515-1515-151515151515', NULL, '{"title": "Temperature Deviation in Storage Room A", "severity": "medium"}', '192.168.1.102', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '2024-01-15 10:00:00'),
    ('44444444-4444-4444-4444-444444444444', '550e8400-e29b-41d4-a716-446655440000', '55555555-5555-5555-5555-555555555555', 'UPDATE', 'capas', '21212121-2121-2121-2121-212121212121', '{"status": "action_plan"}', '{"status": "implementation"}', '192.168.1.103', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '2024-01-25 14:30:00'),
    ('45454545-4545-4545-4545-454545454545', '550e8400-e29b-41d4-a716-446655440000', '33333333-3333-3333-3333-333333333333', 'UPDATE', 'tasks', '34343434-3434-3434-3434-343434343434', '{"status": "pending"}', '{"status": "completed"}', '192.168.1.104', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '2024-01-11 15:30:00');

-- Display summary of seeded data
SELECT 
    'Organizations' as table_name, 
    COUNT(*) as record_count 
FROM organizations
UNION ALL
SELECT 
    'Profiles' as table_name, 
    COUNT(*) as record_count 
FROM profiles
UNION ALL
SELECT 
    'User Roles' as table_name, 
    COUNT(*) as record_count 
FROM user_roles
UNION ALL
SELECT 
    'Documents' as table_name, 
    COUNT(*) as record_count 
FROM documents
UNION ALL
SELECT 
    'Quality Events' as table_name, 
    COUNT(*) as record_count 
FROM quality_events
UNION ALL
SELECT 
    'CAPAs' as table_name, 
    COUNT(*) as record_count 
FROM capas
UNION ALL
SELECT 
    'Change Controls' as table_name, 
    COUNT(*) as record_count 
FROM change_controls
UNION ALL
SELECT 
    'Tasks' as table_name, 
    COUNT(*) as record_count 
FROM tasks
UNION ALL
SELECT 
    'Audit Logs' as table_name, 
    COUNT(*) as record_count 
FROM audit_logs
ORDER BY table_name;
