/**
 * This module is responsible for managing event triggers - a singal, that is sent to BTT app
 * on which some actions shall be performed
 *
 * @TODO: make use of notices mechanism
 */
import { EventCategory } from '../../types/enum';
import { EventTrigger } from '../../types/types';
import Keys from '../keys';

export default class EventTriggers {
  /**
   * Returns all predefined event trigger definitions
   */
  static get all(): EventTrigger[] {
    return EventTriggers.events;
  }

  /**
   * Returns all triggers that match the specified category
   * @param category
   */
  public static getByCategory(category: EventCategory): EventTrigger[] {
    return EventTriggers.all.filter(t => t.category === category);
  }

  /**
   * Returns single trigger based on id
   * @param id
   */
  public static getById(id: number): EventTrigger {
    return EventTriggers.all.find(t => t.id === id);
  }

  /**
   * Returns trigger definition based by name - string passed by user
   *
   * In case user requests key combo event, dummy object is returned
   * @param name
   */
  public static getByName(name: string): EventTrigger {
    // first we need to check whether this particular event exists in predefined list
    const knownEventsLookupResult = EventTriggers.all.find(t => {
      return t.name.toLowerCase() === name.toLowerCase();
    });

    // if so, we can simply return it
    if (knownEventsLookupResult) {
      return knownEventsLookupResult;
    }

    // if the event wasn't found in the predefined list, we'll check for its validity
    // because it might be a key combo
    if (Keys.isValidShortcut(name)) {
      return {
        id: -1,
        category: EventCategory.KEY_COMBO,
        name,
      };
    }

    // otherwise - this event is not valid. at this point, return nothing
  }
  private static events: EventTrigger[] = [
    {
      id: 157,
      category: EventCategory.TRACKPAD,
      name: 'cornerClickBottomLeft',
    },
    {
      id: 158,
      category: EventCategory.TRACKPAD,
      name: 'cornerClickBottomRight',
    },
    {
      id: 182,
      category: EventCategory.TRACKPAD,
      name: 'cornerClickTopLeft',
    },
    {
      id: 183,
      category: EventCategory.TRACKPAD,
      name: 'cornerClickTopRight',
    },
    {
      id: 122,
      category: EventCategory.TRACKPAD,
      name: 'oneFingerTapTopLeft',
    },
    {
      id: 124,
      category: EventCategory.TRACKPAD,
      name: 'oneFingerTapTopMiddle',
    },
    {
      id: 123,
      category: EventCategory.TRACKPAD,
      name: 'oneFingerTapTopRight',
    },
    {
      id: 125,
      category: EventCategory.TRACKPAD,
      name: 'oneFingerTapBottomLeft',
    },
    {
      id: 127,
      category: EventCategory.TRACKPAD,
      name: 'oneFingerTapBottomMiddle',
    },
    {
      id: 126,
      category: EventCategory.TRACKPAD,
      name: 'oneFingerTapBottomRight',
    },
    {
      id: 134,
      category: EventCategory.TRACKPAD,
      name: 'oneFingerTapLeftSideMiddle',
    },
    {
      id: 135,
      category: EventCategory.TRACKPAD,
      name: 'oneFingerTapRightSideMiddle',
    },
    {
      id: 147,
      category: EventCategory.TRACKPAD,
      name: 'triangleSwipeTopLeftCorner',
    },
    {
      id: 148,
      category: EventCategory.TRACKPAD,
      name: 'triangleSwipeTopRightCorner',
    },
    {
      id: 149,
      category: EventCategory.TRACKPAD,
      name: 'triangleSwipeBottomLeftCorner',
    },
    {
      id: 150,
      category: EventCategory.TRACKPAD,
      name: 'triangleSwipeBottomRightCorner',
    },
    {
      id: 173,
      category: EventCategory.TRACKPAD,
      name: 'twoFingerTap',
    },
    {
      id: 179,
      category: EventCategory.TRACKPAD,
      name: 'twoFingerDoubleTap',
    },
    {
      id: 174,
      category: EventCategory.TRACKPAD,
      name: 'twoFingerClick',
    },
    {
      id: 113,
      category: EventCategory.TRACKPAD,
      name: 'tipTapLeft',
    },
    {
      id: 114,
      category: EventCategory.TRACKPAD,
      name: 'tipTapRight',
    },
    {
      id: 115,
      category: EventCategory.TRACKPAD,
      name: 'pinchIn',
    },
    {
      id: 116,
      category: EventCategory.TRACKPAD,
      name: 'pinchOut',
    },
    {
      id: 117,
      category: EventCategory.TRACKPAD,
      name: 'rotateLeft',
    },
    {
      id: 118,
      category: EventCategory.TRACKPAD,
      name: 'rotateRight',
    },
    {
      id: 119,
      category: EventCategory.TRACKPAD,
      name: 'scrollUp',
      notices: [
        {
          text: 'Modifier needed',
        },
      ],
    },
    {
      id: 120,
      category: EventCategory.TRACKPAD,
      name: 'scrollDown',
      notices: [
        {
          text: 'Modifier needed',
        },
      ],
    },
    {
      id: 161,
      category: EventCategory.TRACKPAD,
      name: 'twoFingerSwipeUp',
    },
    {
      id: 162,
      category: EventCategory.TRACKPAD,
      name: 'twoFingerSwipeDown',
    },
    {
      id: 159,
      category: EventCategory.TRACKPAD,
      name: 'twoFingerSwipeLeft',
    },
    {
      id: 160,
      category: EventCategory.TRACKPAD,
      name: 'twoFingerSwipeRight',
    },
    {
      id: 167,
      category: EventCategory.TRACKPAD,
      name: 'twoFingerSwipeFromTopEdge',
    },
    {
      id: 168,
      category: EventCategory.TRACKPAD,
      name: 'twoFingerSwipeFromBottomEdge',
    },
    {
      id: 165,
      category: EventCategory.TRACKPAD,
      name: 'twoFingerSwipeFromLeftEdge',
    },
    {
      id: 166,
      category: EventCategory.TRACKPAD,
      name: 'twoFingerSwipeFromRightEdge',
    },
    {
      id: 104,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerTap',
    },
    {
      id: 163,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerDoubleTap',
    },
    {
      id: 140,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerTapTop',
    },
    {
      id: 139,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerTapBottom',
    },
    {
      id: 112,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerClick',
    },
    {
      id: 102,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerSwipeUp',
    },
    {
      id: 103,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerSwipeDown',
    },
    {
      id: 100,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerSwipeLeft',
    },
    {
      id: 101,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerSwipeRight',
    },
    {
      id: 155,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerClickswipeUp',
    },
    {
      id: 156,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerClickswipeDown',
    },
    {
      id: 153,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerClickswipeLeft',
    },
    {
      id: 154,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerClickswipeRight',
    },
    {
      id: 132,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerTipTapLeft',
    },
    {
      id: 133,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerTipTapRight',
    },
    {
      id: 138,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerTipTapMiddle',
    },
    {
      id: 143,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerTipSwipeLeftFingerUp',
    },
    {
      id: 142,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerTipSwipeLeftFingerDown',
    },
    {
      id: 146,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerTipSwipeLeftFingerLeft',
    },
    {
      id: 145,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerTipSwipeLeftFingerRight',
    },
    {
      id: 197,
      category: EventCategory.TRACKPAD,
      name: 'pinchWithThumbAndTwoFingers',
    },
    {
      id: 198,
      category: EventCategory.TRACKPAD,
      name: 'spreadWithThumbAndTwoFingers',
    },
    {
      id: 110,
      category: EventCategory.TRACKPAD,
      name: 'fourFingerTap',
    },
    {
      id: 169,
      category: EventCategory.TRACKPAD,
      name: 'fourFingerDoubleTap',
    },
    {
      id: 121,
      category: EventCategory.TRACKPAD,
      name: 'fourFingerClick',
    },
    {
      id: 108,
      category: EventCategory.TRACKPAD,
      name: 'fourFingerSwipeUp',
    },
    {
      id: 107,
      category: EventCategory.TRACKPAD,
      name: 'fourFingerSwipeDown',
    },
    {
      id: 105,
      category: EventCategory.TRACKPAD,
      name: 'fourFingerSwipeLeft',
    },
    {
      id: 106,
      category: EventCategory.TRACKPAD,
      name: 'fourFingerSwipeRight',
    },
    {
      id: 194,
      category: EventCategory.TRACKPAD,
      name: 'pinchWithThumbAndThreeFingers',
    },
    {
      id: 195,
      category: EventCategory.TRACKPAD,
      name: 'spreadWithThumbAndThreeFingers',
    },
    {
      id: 136,
      category: EventCategory.TRACKPAD,
      name: 'fourFingerTipTapLeft',
    },
    {
      id: 137,
      category: EventCategory.TRACKPAD,
      name: 'fourFingerTipTapRight',
    },
    {
      id: 111,
      category: EventCategory.TRACKPAD,
      name: 'fiveFingerTap',
    },
    {
      id: 141,
      category: EventCategory.TRACKPAD,
      name: 'fiveFingerClick',
    },
    {
      id: 200,
      category: EventCategory.TRACKPAD,
      name: 'pinchWithThumbAndFourFingers',
    },
    {
      id: 201,
      category: EventCategory.TRACKPAD,
      name: 'spreadWithThumbAndFourFingers',
    },
    {
      id: 131,
      category: EventCategory.TRACKPAD,
      name: 'fiveFingerSwipeUp',
    },
    {
      id: 130,
      category: EventCategory.TRACKPAD,
      name: 'fiveFingerSwipeDown',
    },
    {
      id: 128,
      category: EventCategory.TRACKPAD,
      name: 'fiveFingerSwipeLeft',
    },
    {
      id: 129,
      category: EventCategory.TRACKPAD,
      name: 'fiveFingerSwipeRight',
    },
    {
      id: 151,
      category: EventCategory.TRACKPAD,
      name: 'fiveFingerTouchMove',
    },
    {
      id: 199,
      category: EventCategory.TRACKPAD,
      name: 'wholeHand',
    },
    {
      id: 203,
      category: EventCategory.TRACKPAD,
      name: 'oneFingerForceClick',
    },
    {
      id: 186,
      category: EventCategory.TRACKPAD,
      name: 'cornerForceClickBottomLeft',
    },
    {
      id: 187,
      category: EventCategory.TRACKPAD,
      name: 'cornerForceClickBottomRight',
    },
    {
      id: 184,
      category: EventCategory.TRACKPAD,
      name: 'cornerForceClickTopLeft',
    },
    {
      id: 185,
      category: EventCategory.TRACKPAD,
      name: 'cornerForceClickTopRight',
    },
    {
      id: 176,
      category: EventCategory.TRACKPAD,
      name: 'twoFingerClickLeftHarder',
    },
    {
      id: 177,
      category: EventCategory.TRACKPAD,
      name: 'twoFingerClickRightHarder',
    },
    {
      id: 175,
      category: EventCategory.TRACKPAD,
      name: 'twoFingerForceClick',
    },
    {
      id: 180,
      category: EventCategory.TRACKPAD,
      name: 'twoFingerForceClickLeftHarder',
    },
    {
      id: 181,
      category: EventCategory.TRACKPAD,
      name: 'twoFingerForceClickRightHarder',
    },
    {
      id: 188,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerClickLeftHarder',
    },
    {
      id: 190,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerClickRightHarder',
    },
    {
      id: 170,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerForceClick',
    },
    {
      id: 191,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerForceClickLeftHarder',
    },
    {
      id: 193,
      category: EventCategory.TRACKPAD,
      name: 'threeFingerForceClickRightHarder',
    },
    {
      id: 171,
      category: EventCategory.TRACKPAD,
      name: 'fourFingerForceClick',
    },
    {
      id: 172,
      category: EventCategory.TRACKPAD,
      name: 'fiveFingerForceClick',
    },
    {
      id: 643,
      category: EventCategory.OTHER,
      name: 'namedTrigger',
      notices: [
        {
          text: 'You need to pass a trigger name by which you can later invoke it',
          data: {
            triggerName: 'my-trigger',
          },
        },
      ],
    },
    {
      id: 613,
      category: EventCategory.OTHER,
      name: 'doubleClickMainMenubar',
    },
    {
      id: 600,
      category: EventCategory.OTHER,
      name: 'doubleClickWindowTitlebar',
    },
    {
      id: 623,
      category: EventCategory.OTHER,
      name: 'leftClickFullscreenButton',
    },
    {
      id: 614,
      category: EventCategory.OTHER,
      name: 'rightClickFullscreenButton',
    },
    {
      id: 627,
      category: EventCategory.OTHER,
      name: 'middleClickFullscreenButton',
    },
    {
      id: 622,
      category: EventCategory.OTHER,
      name: 'leftClickRedWindowButton',
    },
    {
      id: 621,
      category: EventCategory.OTHER,
      name: 'leftClickOrangeWindowButton',
    },
    {
      id: 615,
      category: EventCategory.OTHER,
      name: 'leftClickGreenWindowButton',
    },
    {
      id: 601,
      category: EventCategory.OTHER,
      name: 'rightClickRedWindowButton',
    },
    {
      id: 602,
      category: EventCategory.OTHER,
      name: 'rightClickOrangeWindowButton',
    },
    {
      id: 603,
      category: EventCategory.OTHER,
      name: 'rightClickGreenWindowButton',
    },
    {
      id: 626,
      category: EventCategory.OTHER,
      name: 'middleClickRedWindowButton',
    },
    {
      id: 625,
      category: EventCategory.OTHER,
      name: 'middleClickOrangeWindowButton',
    },
    {
      id: 628,
      category: EventCategory.OTHER,
      name: 'middleClickGreenWindowButton',
    },
    {
      id: 641,
      category: EventCategory.OTHER,
      name: 'launchingOnSerialNumber',
      notices: [
        {
          text: 'You need to pass serial number of the Mac for this trigger to work',
          data: {
            // example data
            machineSerialNumber: 'E17L80PMKV0M',
          },
        },
      ],
    },
    {
      id: 609,
      category: EventCategory.OTHER,
      name: 'moveMouseToTopLeftCorner',
      notices: [
        {
          text: 'To use this action, you need to specify some additional fields',
          data: {
            delayBeforeTriggering: 0,
            allowDragging: 0, // 0 | 1
          },
        },
      ],
    },
    {
      id: 610,
      category: EventCategory.OTHER,
      name: 'moveMouseToTopRightCorner',
      notices: [
        {
          text: 'To use this action, you need to specify some additional fields',
          data: {
            delayBeforeTriggering: 0,
            allowDragging: 0, // 0 | 1
          },
        },
      ],
    },
    {
      id: 611,
      category: EventCategory.OTHER,
      name: 'moveMouseToBottomLeftCorner',
      notices: [
        {
          text: 'To use this action, you need to specify some additional fields',
          data: {
            delayBeforeTriggering: 0,
            allowDragging: 0, // 0 | 1
          },
        },
      ],
    },
    {
      id: 612,
      category: EventCategory.OTHER,
      name: 'moveMouseToBottomRightCorner',
      notices: [
        {
          text: 'To use this action, you need to specify some additional fields',
          data: {
            delayBeforeTriggering: 0,
            allowDragging: 0, // 0 | 1
          },
        },
      ],
    },
    {
      id: 607,
      category: EventCategory.OTHER,
      name: 'recievedDistributedNotificationWithName',
      notices: [
        {
          text: 'You need to specify the name of the notification to respond to',
          data: {
            distributedNotificationName: 'some-name',
          },
        },
      ],
    },
    {
      id: 616,
      category: EventCategory.OTHER,
      name: 'bluetoothDeviceCameClose',
      notices: [
        {
          text:
            'If you want to register some events related to bluetooth on the fly, you need to specify the following',
          data: {
            // @TODO
          },
        },
      ],
    },
    {
      id: 617,
      category: EventCategory.OTHER,
      name: 'bluetoothDeviceMovedAway',
      notices: [
        {
          text:
            'If you want to register some events related to bluetooth on the fly, you need to specify the following',
          data: {
            // @TODO
          },
        },
      ],
    },
    {
      id: 618,
      category: EventCategory.OTHER,
      name: 'bluetoothDeviceOutOfRange',
      notices: [
        {
          text:
            'If you want to register some events related to bluetooth on the fly, you need to specify the following',
          data: {
            // @TODO
          },
        },
      ],
    },
    {
      id: 619,
      category: EventCategory.OTHER,
      name: 'bluetoothDeviceBackInRange',
      notices: [
        {
          text:
            'If you want to register some events related to bluetooth on the fly, you need to specify the following',
          data: {
            // @TODO
          },
        },
      ],
    },
    {
      id: 605,
      category: EventCategory.OTHER,
      name: 'beforeMacGoesToSleep',
    },
    {
      id: 606,
      category: EventCategory.OTHER,
      name: 'afterMacWakesFromSleep',
    },
    {
      id: 325,
      category: EventCategory.SIRI_REMOTE,
      name: 'srButtonMenu',
    },
    {
      id: 320,
      category: EventCategory.SIRI_REMOTE,
      name: 'srButtonVolumeUp',
    },
    {
      id: 321,
      category: EventCategory.SIRI_REMOTE,
      name: 'srButtonVolumeDown',
    },
    {
      id: 323,
      category: EventCategory.SIRI_REMOTE,
      name: 'srButtonPlayPause',
    },
    {
      id: 322,
      category: EventCategory.SIRI_REMOTE,
      name: 'srButtonMicrophone',
    },
    {
      id: 324,
      category: EventCategory.SIRI_REMOTE,
      name: 'srButtonTvScreen',
    },
    {
      id: 337,
      category: EventCategory.SIRI_REMOTE,
      name: 'srButtonHoldMenu',
    },
    {
      id: 336,
      category: EventCategory.SIRI_REMOTE,
      name: 'srButtonHoldTvScreen',
    },
    {
      id: 334,
      category: EventCategory.SIRI_REMOTE,
      name: 'srButtonHoldMicrophone',
    },
    {
      id: 335,
      category: EventCategory.SIRI_REMOTE,
      name: 'srButtonHoldPlayPause',
    },
    {
      id: 332,
      category: EventCategory.SIRI_REMOTE,
      name: 'srButtonHoldVolumeUp',
    },
    {
      id: 333,
      category: EventCategory.SIRI_REMOTE,
      name: 'srButtonHoldVolumeDown',
    },
    {
      id: 329,
      category: EventCategory.SIRI_REMOTE,
      name: 'srSwipeUp',
    },
    {
      id: 330,
      category: EventCategory.SIRI_REMOTE,
      name: 'srSwipeDown',
    },
    {
      id: 327,
      category: EventCategory.SIRI_REMOTE,
      name: 'srSwipeLeft',
    },
    {
      id: 328,
      category: EventCategory.SIRI_REMOTE,
      name: 'srSwipeRight',
    },
    {
      id: 331,
      category: EventCategory.SIRI_REMOTE,
      name: 'srTap',
    },
    {
      id: 343,
      category: EventCategory.SIRI_REMOTE,
      name: 'srTapLeft',
    },
    {
      id: 344,
      category: EventCategory.SIRI_REMOTE,
      name: 'srTapRight',
    },
    {
      id: 345,
      category: EventCategory.SIRI_REMOTE,
      name: 'srTapTop',
    },
    {
      id: 346,
      category: EventCategory.SIRI_REMOTE,
      name: 'srTapBottom',
    },
    {
      id: 326,
      category: EventCategory.SIRI_REMOTE,
      name: 'srClick',
    },
    {
      id: 339,
      category: EventCategory.SIRI_REMOTE,
      name: 'srClickLeft',
    },
    {
      id: 340,
      category: EventCategory.SIRI_REMOTE,
      name: 'srClickRight',
    },
    {
      id: 341,
      category: EventCategory.SIRI_REMOTE,
      name: 'srClickTop',
    },
    {
      id: 342,
      category: EventCategory.SIRI_REMOTE,
      name: 'srClickBottom',
    },
    {
      id: 338,
      category: EventCategory.SIRI_REMOTE,
      name: 'srClickHold',
    },
    {
      id: 347,
      category: EventCategory.SIRI_REMOTE,
      name: 'srClickHoldLeft',
    },
    {
      id: 348,
      category: EventCategory.SIRI_REMOTE,
      name: 'srClickHoldRight',
    },
    {
      id: 349,
      category: EventCategory.SIRI_REMOTE,
      name: 'srClickHoldTop',
    },
    {
      id: 350,
      category: EventCategory.SIRI_REMOTE,
      name: 'srClickHoldBottom',
    },
    {
      id: 1,
      category: EventCategory.MAGIC_MOUSE,
      name: 'oneFingerTap',
    },
    {
      id: 2,
      category: EventCategory.MAGIC_MOUSE,
      name: 'oneFingerTapLeft',
    },
    {
      id: 3,
      category: EventCategory.MAGIC_MOUSE,
      name: 'oneFingerTapRight',
    },
    {
      id: 23,
      category: EventCategory.MAGIC_MOUSE,
      name: 'oneFingerTapMiddleClick',
    },
    {
      id: 24,
      category: EventCategory.MAGIC_MOUSE,
      name: 'oneFingerTapMiddle',
    },
    {
      id: 32,
      category: EventCategory.MAGIC_MOUSE,
      name: 'oneFingerTapAboveApple',
    },
    {
      id: 18,
      category: EventCategory.MAGIC_MOUSE,
      name: 'scrollUp',
      notices: [
        {
          text: 'Modifier needed',
        },
      ],
    },
    {
      id: 19,
      category: EventCategory.MAGIC_MOUSE,
      name: 'scrollDown',
      notices: [
        {
          text: 'Modifier needed',
        },
      ],
    },
    {
      id: 34,
      category: EventCategory.MAGIC_MOUSE,
      name: 'oneFingerSwipeUp',
    },
    {
      id: 33,
      category: EventCategory.MAGIC_MOUSE,
      name: 'oneFingerSwipeDown',
    },
    {
      id: 35,
      category: EventCategory.MAGIC_MOUSE,
      name: 'oneFingerSwipeLeft',
    },
    {
      id: 36,
      category: EventCategory.MAGIC_MOUSE,
      name: 'oneFingerSwipeRight',
    },
    {
      id: 2,
      category: EventCategory.MAGIC_MOUSE,
      name: 'twoFingerTap',
    },
    {
      id: 44,
      category: EventCategory.MAGIC_MOUSE,
      name: 'twoFingerDoubleTap',
    },
    {
      id: 15,
      category: EventCategory.MAGIC_MOUSE,
      name: 'pinchIn',
    },
    {
      id: 14,
      category: EventCategory.MAGIC_MOUSE,
      name: 'pinchOut',
    },
    {
      id: 6,
      category: EventCategory.MAGIC_MOUSE,
      name: 'twoFingerSwipeRight',
    },
    {
      id: 5,
      category: EventCategory.MAGIC_MOUSE,
      name: 'twoFingerSwipeLeft',
    },
    {
      id: 8,
      category: EventCategory.MAGIC_MOUSE,
      name: 'twoFingerSwipeDown',
    },
    {
      id: 7,
      category: EventCategory.MAGIC_MOUSE,
      name: 'twoFingerSwipeUp',
    },
    {
      id: 20,
      category: EventCategory.MAGIC_MOUSE,
      name: 'twoFingerClick',
    },
    {
      id: 12,
      category: EventCategory.MAGIC_MOUSE,
      name: 'threeFingerSwipeDown',
    },
    {
      id: 13,
      category: EventCategory.MAGIC_MOUSE,
      name: 'threeFingerSwipeUp',
    },
    {
      id: 21,
      category: EventCategory.MAGIC_MOUSE,
      name: 'threeFingerClick',
    },
    {
      id: 45,
      category: EventCategory.MAGIC_MOUSE,
      name: 'threeFingerDoubleTap',
    },
    {
      id: 9,
      category: EventCategory.MAGIC_MOUSE,
      name: 'threeFingerTap',
    },
    {
      id: 17,
      category: EventCategory.MAGIC_MOUSE,
      name: 'tipTapRight',
    },
    {
      id: 16,
      category: EventCategory.MAGIC_MOUSE,
      name: 'tipTapLeft',
    },
    {
      id: 41,
      category: EventCategory.MAGIC_MOUSE,
      name: 'tipSwipeLeftFingerDown',
    },
    {
      id: 42,
      category: EventCategory.MAGIC_MOUSE,
      name: 'tipSwipeLeftFingerUp',
    },
    {
      id: 31,
      category: EventCategory.MAGIC_MOUSE,
      name: 'threeFingerTipTapRight',
    },
    {
      id: 37,
      category: EventCategory.MAGIC_MOUSE,
      name: 'threeFingerTipTapMiddle',
    },
    {
      id: 30,
      category: EventCategory.MAGIC_MOUSE,
      name: 'threeFingerTipTapLeft',
    },
    {
      id: 11,
      category: EventCategory.MAGIC_MOUSE,
      name: 'threeFingerSwipeRight',
    },
    {
      id: 10,
      category: EventCategory.MAGIC_MOUSE,
      name: 'threeFingerSwipeLeft',
    },
    {
      id: 38,
      category: EventCategory.MAGIC_MOUSE,
      name: 'twoFingerTouchTop',
    },
    {
      id: 40,
      category: EventCategory.MAGIC_MOUSE,
      name: 'oneFingerTouchTop',
    },
    {
      id: 29,
      category: EventCategory.MAGIC_MOUSE,
      name: 'fourFingerSwipeRight',
    },
    {
      id: 28,
      category: EventCategory.MAGIC_MOUSE,
      name: 'fourFingerSwipeLeft',
    },
    {
      id: 26,
      category: EventCategory.MAGIC_MOUSE,
      name: 'fourFingerSwipeDown',
    },
    {
      id: 27,
      category: EventCategory.MAGIC_MOUSE,
      name: 'fourFingerSwipeUp',
    },
    {
      id: 25,
      category: EventCategory.MAGIC_MOUSE,
      name: 'fourFingerClick',
    },
    {
      id: 39,
      category: EventCategory.MAGIC_MOUSE,
      name: 'threeFingerTouchTop',
    },
  ];
}
