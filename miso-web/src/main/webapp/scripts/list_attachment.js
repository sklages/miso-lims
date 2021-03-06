/*
 * Copyright (c) 2012. The Genome Analysis Centre, Norwich, UK
 * MISO project contacts: Robert Davey @ TGAC
 * *********************************************************************
 *
 * This file is part of MISO.
 *
 * MISO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MISO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MISO.  If not, see <http://www.gnu.org/licenses/>.
 *
 * *********************************************************************
 */

ListTarget.attachment = (function() {
  var showUploadDialog = function(entityType, entityId) {
    var dialogArea = jQuery('#dialog');
    dialogArea.empty();

    var form = jQuery('<form id="uploadForm">');
    form.append(jQuery('<input id="fileInput" type="file" name="file">'));
    dialogArea.append(form);

    var dialog = dialogArea.dialog({
      autoOpen: true,
      width: 500,
      title: 'Attach File',
      modal: true,
      buttons: {
        upload: {
          id: 'upload',
          text: 'Upload',
          click: function() {
            if (!jQuery('#fileInput').val()) {
              alert('No file selected!');
              return;
            }
            var formData = new FormData(jQuery('#uploadForm')[0]);
            dialog.dialog("close");
            dialogArea.empty();
            dialogArea.append(jQuery('<p>Uploading...</p>'));

            dialog = jQuery('#dialog').dialog({
              autoOpen: true,
              height: 400,
              width: 350,
              title: 'Uploading File',
              modal: true,
              buttons: {},
              closeOnEscape: false,
              open: function(event, ui) {
                jQuery(this).parent().children().children('.ui-dialog-titlebar-close').hide();
              }
            });

            jQuery.ajax({
              url: '/miso/attachments/' + entityType + '/' + entityId,
              type: 'POST',
              data: formData,
              cache: false,
              contentType: false,
              processData: false
            }).success(function(data) {
              dialog.dialog("close");
              Utils.page.pageReload();
            }).fail(function(xhr, textStatus, errorThrown) {
              dialog.dialog("close");
              Utils.showAjaxErrorDialog(xhr, textStatus, errorThrown);
            });
          }
        },
        cancel: {
          id: 'cancel',
          text: 'Cancel',
          click: function() {
            dialog.dialog("close");
          }
        }
      }
    });
  };

  return {
    name: "Attachments",
    createUrl: function(config, projectId) {
      throw "Static data only";
    },
    createBulkActions: function(config, projectId) {
      return [];
    },
    createStaticActions: function(config, projectId) {
      return [{
        name: 'Upload',
        handler: function() {
          showUploadDialog(config.entityType, config.entityId);
        }
      }];
    },
    createColumns: function(config) {
      return [
          {
            sTitle: 'Filename',
            mData: 'filename',
            include: true,
            iSortPriority: 1,
            mRender: function(data, type, full) {
              if (type === 'display') {
                return '<a href="/miso/attachments/' + config.entityType + '/' + config.entityId + '/' + full.id + '">' + data + '</a>';
              }
              return data;
            }
          },
          {
            sTitle: 'Uploaded By',
            mData: 'creator',
            include: true,
            iSortPriority: 0
          },
          {
            sTitle: 'Upload Date',
            mData: 'created',
            include: true,
            iSortPriority: 0
          },
          {
            sTitle: 'Delete',
            mData: null,
            include: true,
            iSortPriority: 0,
            mRender: function(data, type, full) {
              if (type === 'display') {
                return '<div class="misoicon" onclick="ListTarget.attachment.deleteFile(\'' + config.entityType + '\', ' + config.entityId
                    + ', ' + full.id + ', \'' + full.filename + '\')"><span class="ui-icon ui-icon-trash"></span></div>';
              }
              return '';
            }
          }];
    },
    deleteFile: function(entityType, entityId, attachmentId, filename) {
      Utils.showConfirmDialog('Delete file', 'Delete', ['Are you sure you wish to delete ' + filename + '? This cannot be undone.'],
          function() {
            var url = '/miso/rest/attachments/' + entityType + '/' + entityId + '/' + attachmentId;
            Utils.ajaxWithDialog('Deleting file', 'DELETE', url, null, function() {
              Utils.page.pageReload();
            });
          });
    }
  };
})();
