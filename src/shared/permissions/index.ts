export const PERMISSIONS = {
    ALL: { ID: '11ab66c5-ffe1-4825-822b-16c4147b5190', NAME: 'all' },
    DEVELOPER: { ID: '11ab66c5-ffe1-4825-822b-16c4147b5191', NAME: 'developer:all' },
    BRAND: {
        CREATE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5192', NAME: 'brand:create' },
        UPDATE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5193', NAME: 'brand:update' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5194', NAME: 'brand:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5195', NAME: 'brand:delete' },
    },
    GYM: {
        CREATE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b519a', NAME: 'gym:create' },
        UPDATE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b519b', NAME: 'gym:update' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5197', NAME: 'gym:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5198', NAME: 'gym:delete' },
    },
    GYM_DEVICE: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5199', NAME: 'gym_device:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5200', NAME: 'gym_device:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5201', NAME: 'gym_device:delete' },
    },
    GYM_STUDIO: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5202', NAME: 'gym_studio:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5203', NAME: 'gym_studio:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5204', NAME: 'gym_studio:delete' },
    },
    INSTRUCTOR: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5205', NAME: 'instructor:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5206', NAME: 'instructor:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5207', NAME: 'instructor:delete' },
    },
    SERVICE: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5208', NAME: 'service:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5209', NAME: 'service:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5210', NAME: 'service:delete' },
    },
    SESSION_CONTRACT: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5211', NAME: 'session_contract:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5212', NAME: 'session_contract:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5213', NAME: 'session_contract:delete' },
        BOOK:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5214', NAME: 'session_contract:book' },
        PAY:    { ID:'11ab66c5-ffe1-4825-822b-16c4147b5215', NAME: 'session_contract:pay' },
    },
    CLASS: {
        UPSERT:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5216', NAME: 'class:upsert' },
        VIEW:     { ID:'11ab66c5-ffe1-4825-822b-16c4147b5217', NAME: 'class:view' },
        DELETE:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5218', NAME: 'class:delete' },
        PURCHASE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5219', NAME: 'class:purchase' },
    },
    LEAD: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5220', NAME: 'lead:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5221', NAME: 'lead:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5222', NAME: 'lead:delete' },
    },
    DISCOUNT: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5223', NAME: 'discount:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5224', NAME: 'discount:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5225', NAME: 'discount:delete' },
    },
    MEMBERSHIP_PLAN: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5226', NAME: 'membership_plan:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5227', NAME: 'membership_plan:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5228', NAME: 'membership_plan:delete' },
    },
    MEMBERSHIP_PLAN_GROUP: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5229', NAME: 'membership_plan_group:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5230', NAME: 'membership_plan_group:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5231', NAME: 'membership_plan_group:delete' },
    },
    MEMBERSHIP: {
        LIST:      { ID:'11ab66c5-ffe1-4825-822b-16c4147b523a', NAME: 'membership:list' },
        PURCHASE:  { ID:'11ab66c5-ffe1-4825-822b-16c4147b5232', NAME: 'membership:purchase' },
        TERMINATE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5233', NAME: 'membership:terminate' },
        CHANGE:    { ID:'11ab66c5-ffe1-4825-822b-16c4147b5234', NAME: 'membership:change' },
        CANCEL:    { ID:'11ab66c5-ffe1-4825-822b-16c4147b5235', NAME: 'membership:cancel' },
        TRANSFER:  { ID:'11ab66c5-ffe1-4825-822b-16c4147b5236', NAME: 'membership:transfer' },
        RELOCATE:  { ID:'11ab66c5-ffe1-4825-822b-16c4147b5237', NAME: 'membership:relocate' },
        FREEZE:    { ID:'11ab66c5-ffe1-4825-822b-16c4147b5238', NAME: 'membership:freeze' },
        UNFREEZE:  { ID:'11ab66c5-ffe1-4825-822b-16c4147b5239', NAME: 'membership:unfreeze' },
    },
    LEAD_APPOINTMENT: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5240', NAME: 'lead_appointment:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5241', NAME: 'lead_appointment:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5242', NAME: 'lead_appointment:delete' },
    },
    LEAD_CALL: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5243', NAME: 'lead_call:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5244', NAME: 'lead_call:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5245', NAME: 'lead_call:delete' },
    },
    CLASS_SCHEDULE: {
        UPSERT:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5246', NAME: 'class_schedule:upsert' },
        VIEW:     { ID:'11ab66c5-ffe1-4825-822b-16c4147b5247', NAME: 'class_schedule:view' },
        DELETE:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5248', NAME: 'class_schedule:delete' },
        ATTEND:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b521a', NAME: 'class_schedule:attend' },
        MODIFY:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b524b', NAME: 'class_schedule:modify' },
        MARK_DONE:{ ID:'11ab66c5-ffe1-4825-822b-16c4147b524c', NAME: 'class_schedule:mark_done' }, // We handle have adjusted it within modify, but pt-admins can mark-done but not modify, this requires separate permissions to be handled.
    },
    ADMIN: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5249', NAME: 'admin:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5250', NAME: 'admin:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5251', NAME: 'admin:delete' },
    },
    PAYMENT_PLAN: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5252', NAME: 'payment_plan:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5253', NAME: 'payment_plan:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5254', NAME: 'payment_plan:delete' },
    },
    LEAD_CONVERSION_REPORT: {
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5255', NAME: 'lead_conversion_report:view' },
    },
    DAILY_SALES_REPORT: {
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5256', NAME: 'daily_sales_report:view' },
    },
    PT_COMMISSION_REPORT: {
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5257', NAME: 'pt_commission_report:view' },
    },
    PT_BOOKING_ATTENDANCE_REPORT: {
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5258', NAME: 'pt_booking_attendance_report:view' },
    },
    CLASS_COMMISSION_REPORT: {
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5259', NAME: 'class_commission_report:view' },
    },
    AMENITY: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5260', NAME: 'amenity:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5261', NAME: 'amenity:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5262', NAME: 'amenity:delete' },
    },
    WORKOUT_MACHINE: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5263', NAME: 'workout_machine:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5264', NAME: 'workout_machine:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5265', NAME: 'workout_machine:delete' },
    },
    LEAD_EMAIL: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5266', NAME: 'lead_email:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5267', NAME: 'lead_email:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5268', NAME: 'lead_email:delete' },
    },
    LEAD_NOTIFICATION: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5269', NAME: 'lead_notification:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5270', NAME: 'lead_notification:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5271', NAME: 'lead_notification:delete' },
    },
    LEAD_NOTE: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5272', NAME: 'lead_note:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5273', NAME: 'lead_note:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5274', NAME: 'lead_note:delete' },
    },
    LEAD_TASK: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5275', NAME: 'lead_task:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5276', NAME: 'lead_task:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5277', NAME: 'lead_task:delete' },
    },
    POS: {
        PURCHASE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5278', NAME: 'pos:purchase' },
    },
    PAYMENTS: {
        VIEW: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5279', NAME: 'payments:view' },
    },
    POS_ORDER: {
        VIEW: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5280', NAME: 'pos_order:view' },
    },
    POS_CATEGORY: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5281', NAME: 'pos_category:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5282', NAME: 'pos_category:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5283', NAME: 'pos_category:delete' },
    },
    POS_PRODUCT: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5284', NAME: 'pos_product:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5285', NAME: 'pos_product:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5286', NAME: 'pos_product:delete' },
    },
    FREEZE_TYPE: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5287', NAME: 'freeze_type:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5288', NAME: 'freeze_type:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5289', NAME: 'freeze_type:delete' },
    },
    PRODUCT: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5290', NAME: 'product:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5291', NAME: 'product:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5292', NAME: 'product:delete' },
    },
    PRODUCT_CATEGORY: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5293', NAME: 'product_category:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5294', NAME: 'product_category:view' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5295', NAME: 'product_category:delete' },
    },
    CUSTOMER: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5296', NAME: 'customer:upsert' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5297', NAME: 'customer:view' },
    },
    GYM_QR_SESSION: {
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5298', NAME: 'gym_qr_session:view' },
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5299', NAME: 'gym_qr_session:upsert' },
    },
    SUBSCRIPTION: {
        VIEW: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5300', NAME: 'subscription:view' },
        PAYMENT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5301', NAME: 'subscription:payment' },
        PURCHASE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5302', NAME: 'subscription:purchase' },
    },
    EXPENSE: {
        VIEW: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5303', NAME: 'expense:view' },
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5304', NAME: 'expense:upsert' },
        DELETE: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5305', NAME: 'expense:delete' },
    },
    PT_COMMISSION: {
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5306', NAME: 'pt_commission:view' },
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5307', NAME: 'pt_commission:upsert' },
    },
    CLASS_COMMISSION: {
        VIEW:   { ID:'11ab66c5-ffe1-4825-822b-16c4147b5308', NAME: 'class_commission:view' },
        UPSERT: { ID:'11ab66c5-ffe1-4825-822b-16c4147b5309', NAME: 'class_commission:upsert' },
    },
};