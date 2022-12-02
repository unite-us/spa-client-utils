import { getSlimUser } from './getSlimUser';

describe('getSlimUser', () => {
  const user = {
    fetchingUser: false,
    id: '6955081b-5e47-49c4-bf48-1214b47222c9',
    email: 'micah@manager.com',
    first_name: 'Micah',
    last_name: 'Manager',
    full_name: 'Micah Manager',
    groups: [
      {
        group: {
          id: '6f6cce68-fc3f-4d38-9e11-720d949402e7',
          name: 'Micah Org [Dev Only]',
          state: 'active',
          _meta: {
            _type: 'group',
          },
        },
        feature_flags: {
          referrals_auto_recall_referrals: true,
          referrals_recall_referrals: true,
          referrals_forward_referrals: true,
          referrals_view_closed_referrals: true,
          referrals_close_referrals: true,
          referrals_view_referral_details: true,
          workflow_index: true,
          referrals_edit_update_interactions: true,
          referrals_create_interactions: true,
          referrals_edit_update_referrals: true,
          dashboard_widgets_incoming_referrals: true,
          dashboard_dashboard_widgets: true,
          dashboard: true,
          workflow_index_view_index: true,
          referrals: true,
          referrals_enroll_decline_referrals: true,
          referrals_create_referrals: true,
          referrals_view_outgoing_referrals: true,
          referrals_smart_referrals: true,
          referrals_view_incoming_referrals: true,
          programs_view_programs: true,
          programs: true,
          organization_user_management_edit_update_users: true,
          organization_user_management: true,
          organization_user_management_add_invite_users: true,
          programs_add_remove_users: true,
          public_organization_profile: true,
          programs_create_programs: true,
          programs_edit_update_programs: true,
          organization_settings: true,
          organization_settings_view_settings: true,
          public_organization_profile_display: true,
          public_organization_profile_edit_update: true,
          assistance_requests_view_incoming: true,
          assistance_requests: true,
          assistance_requests_convert_to_referral: true,
          dashboard_widgets_new_assistance_requests: true,
          assistance_requests_convert_to_case: true,
          intake_create_intakes: true,
          intake: true,
          intake_view_intakes: true,
          reports_military_reports: true,
          contacts: true,
          contacts_create_contacts: true,
          contacts_view_contacts: true,
          contacts_care_team: true,
          contacts_edit_update_contacts: true,
          contacts_basic_information: true,
          contacts_profile_information: true,
          contacts_services_tracking: true,
          contacts_interactions: true,
          contacts_notes: true,
          reports_view_reports: true,
          reports: true,
          documents_edit_update_documents: true,
          documents_upload_documents: true,
          documents_download_documents: true,
          assessments_download_assessments: true,
          assessments_edit_update_assessments: true,
          documents_view_documents: true,
          documents: true,
          cases_edit_update_cases: true,
          cases_create_cases: true,
          assessments_view_assessments: true,
          assessments: true,
          households_create_household_members: true,
          households_edit_update_household_members: true,
          cases: true,
          cases_view_cases: true,
          profile_information_view_profile_information: true,
          profile_information_edit_update_profile_information: true,
          households: true,
          households_view_household_information: true,
          basic_information: true,
          basic_information_view_basic_information: true,
          basic_information_edit_update_basic_information: true,
          profile_information: true,
          notes_view_notes: true,
          notes_create_notes: true,
          notes_edit_update_notes: true,
          notes_delete_notes: true,
          notes: true,
          services_tracking_edit_update_services_tracked: true,
          services_tracking_view_services_tracked: true,
          services_tracking_create_track_services: true,
          services_tracking: true,
          interactions_edit_update_interactions: true,
          interactions_create_interactions: true,
          interactions_view_interactions: true,
          interactions: true,
          care_team_edit_update_care_team_members: true,
          care_team_create_care_team_members: true,
          care_team_view_care_team: true,
          care_team: true,
          contacts_cases: true,
          contacts_households: true,
        },
        roles: [
          {
            id: '2177e817-4f01-46f7-adae-e01c07cc7e74',
            name: 'Referrals User',
          },
          {
            id: '2865942e-5b9d-42d0-9675-f07a8f25a722',
            name: 'Referrals Admin User',
          },
          {
            id: '6d28efb1-397f-4780-8089-beae7467b5b5',
            name: 'Organization Administrator',
          },
          {
            id: 'f6b581bf-f70d-45ce-bfb4-003ee85b5d60',
            name: 'Assistance Requests User',
          },
          {
            id: '05507b3d-a491-45ae-9889-11926432d184',
            name: 'Intakes User',
          },
          {
            id: '6748e276-8268-4f8b-8adf-026dfa607922',
            name: 'Case Manager',
          },
        ],
      },
    ],
    networks: [
      {
        id: 'c88b9628-b76c-434b-ad58-62bb2ca9d6c0',
        name: 'Developer Playground [DEVS ONLY]',
      },
    ],
    impersonation_type: null,
  };

  const slimGroup = {
    id: '6f6cce68-fc3f-4d38-9e11-720d949402e7',
    name: 'Micah Org [Dev Only]',
    is_coordination_center: true,
    state: 'active',
  };

  const slimUser = {
    email: 'micah@manager.com',
    first_name: 'Micah',
    id: '6955081b-5e47-49c4-bf48-1214b47222c9',
    impersonation_type: null,
    last_name: 'Manager',
    networks: [
      {
        id: 'c88b9628-b76c-434b-ad58-62bb2ca9d6c0',
        name: 'Developer Playground [DEVS ONLY]',
      },
    ],
    roles: [
      'Referrals User',
      'Referrals Admin User',
      'Organization Administrator',
      'Assistance Requests User',
      'Intakes User',
      'Case Manager',
    ],
  };


  it('returns a slimmed version of a user object', () => {
    expect(getSlimUser(user, slimGroup))
      .toEqual(slimUser);
  });

  it('returns a slimmed version of an impersonated user object', () => {
    expect(getSlimUser({ ...user, impersonation_type: 'user' }, slimGroup))
      .toEqual({
        ...slimUser,
        impersonation_type: 'user',
      });
  });
});
