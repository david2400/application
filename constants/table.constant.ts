export enum EntityList {
  // constant
  ROLE_TYPE = 'role_types',
  USER_ROLE = 'role',
  GROUP_ROLE = 'group_roles',
  FILE_TYPE = 'file_types',
  TAG_TYPE = 'tag_types',
  TAG = 'tags',
  STATUS_TYPE = 'status_types',
  STATUS = 'status',
  RELATION_TYPE = 'relation_types',
  RELATION = 'relations',
  NOTIFICATION_TYPE = 'notification_types',
  NOTIFICATION = 'notifications',

  // User
  USER = 'users',
  USER_FILE = 'user_files',
  USER_NOTIFICATION = 'user_notifications',
  USER_RELATION = 'user_relations',

  // message
  ROOM = 'rooms',
  ROOM_FILE = 'room_files',
  USER_ROOM = 'user_rooms',
  ROOM_MESSAGE = 'room_messages',
  INBOX = 'inboxs',
  INBOX_FILE = 'inbox_files',
  USER_INBOX = 'user_inboxs',

  // course
  COURSE = 'courses',
  COURSE_REVIEW = 'course_reviews',
  COURSE_ORDER = 'course_orders',
  COURSE_PART = 'course_parts',
  COURSE_PART_FILE = 'course_part_files',
  COURSE_PART_COMMENT = 'course_part_comments',
  COURSE_PART_REPLY = 'course_part_replys',

  // post
  FORUM = 'forums',
  USER_FORUM = 'user_forums',
  POST = 'posts',
  USER_POST = 'user_posts',
  POST_FILE = 'post_files',
  REPLY = 'replys',
  USER_REPLY = 'user_replys',
  COMMENT = 'comments',
  USER_COMMENT = 'user_comments',
}
