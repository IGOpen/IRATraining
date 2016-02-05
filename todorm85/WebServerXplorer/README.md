# WebServerXplorer
Web-based file manager

## Business problem

   An architectural office needs to share some of their working files with their subcontractors and clients. Every project that the studio is working on is stored in a single folder at a central location on a local server. Every project starts with strict directory structure and naming that is never changed. It is important that at any time subcontractors and clients have access to the latest up-to-date data. The remote access needs to be simple and easy to use from the client perspective - using just the browser as if doing normal web surfing (no ftp or complex VPN access). This is required because most of the subcontractors\` employees have limitted computer literacy and mostly work with their specific software and surf the web. User access control should also be very simple and straightforward since non-technical staff will use it. There`s also a big turnover of subcontractors, so training them is not efficient.

## Project requirements

- Any folders inside a certain root folder at the server should be available for remote sharing by administrators

- There should be a simple user-based access control only for the folders

- Access-control should be inheritable

    e.x. If subdir1 is inside dir1, and user1 has read access to dir1, he also should have read access to subdir1.
    
- Sharing should be really simple via file uploads and downloads using the most common web browsers and their native implementation of uploads and downloads

- Remote file system access control should be platform independent - that is, all remote user access logic should be abstracted from the underlying operating system\`s file system access control. For example if the storage is formatted with NTFS, users should not use NTFS permissions (most common file system permissions are very complex to manage even for pros).

- There should be two types of permissions for a folder - read and write, if user has write, he also has read.

- Read permissions allow user to view (download) files in that directory

- Users should also be able to upload files, overwrite existing or delete them if they have write access permissions.

- When giving more restricted access to subfolders administrators should be presented with a warning message, because renaming the folder will discard these restrictions. See [remarks 2](#remarks)

- LAN users should continue to use the storage server as before, using their OS\`s file system explorers. This means that the files will be updated and changed by them as well. Possbile conflict if file is open by a LAN user, will crash if not handled correctly.

## Technical example

**user1** has the following permissions:
   
    dir1 : read, write
    dir1/sub1 : read

**user2** has the following permissions:
   
    dir1/sub1 : write

- User1 wants to access the directory /dir1/sub1/sub11. First user1 permissions are checked for existance of /dir1/sub1/sub11. There is no entry so the lookup process continues with the parent directory. Then /dir1/sub1 is checked. An entry is found and it states that the user has read permissions. The lookup process finishes and user1 is given read access to /dir1/sub1/sub11

- User2 wants to access dir1. There\`s no entry for dir1 in user2 permissions and there\`s no parent dir. The lookup process finishes and access is denied.

- User2 wants to access dir1/sub1. Lookup starts with dir1/sub1 and a match is found. User is given write access to dir1/sub1.

- User2 wants to access dir1/sub1/sub11. Lookup starts with dir1/sub1/sub11. No match is found and the lookup process continues with dir1/sub1. A match is found and user2 is given write access to dir1/sub1/sub11.

### Remarks
    
1. It is better to keep access control information in user entities, because we have potentially hundreds of thousand of folders that won`t be deleted for long time and a realtively small amount of users. This will guarantee smaller database size.

2. Remote user permissions are based on directory naming so renaming a folder could pose a security problem. Since projects conform to strict directory structure and naming that is not subject for change at any time this is not a problem in the current context. However, caution should be taken when renaming folders that have users with more restircted access than any of their parent folders for the same user.

    Example:

    **user1** permissions:

    dir | permissions
    --- | ---
    dir1 | read, write
    dir1/sub1 | read

    If sub1 is renamed to sub2 user1 will get write permission for that directory. **A warning message should be displayed when the administrator gives more restircted permissions for a subfolder. It must be ensured that the folder name is not changed ор хандлед цо.**

## Site pages

#### PUBLIC:
1. Home (show statistics etc.)
1. Register - todorm85 - DONE!
1. Login - todorm85 - DONE!
1. Browse dirs (authentiacated users are able to see private folders, that they have permissions for, unauthenticated users are able to see only files inside folder public) - todorm85

#### STANDART:
1. List my uploaded files (also able to delete them)
1. Upload files to dir (users are automatically granted permissions to files that they upload)

#### ADMINISTRATOR:
1. Add new user
1. Edit existing user settings