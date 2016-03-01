(function() {
  var Alarms, changeTime, currentAlarmNumber, getFrequencyText, setAlarm,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Alarms = [];

  currentAlarmNumber = null;

  changeTime = function(value, max, actionType) {
    if (actionType === 'increase') {
      value++;
      if (value > max) {
        value = 0;
      }
    } else {
      value--;
      if (value < 0) {
        value = max;
      }
    }
    if (value < 10) {
      value = "0" + value;
    }
    return value;
  };

  getFrequencyText = function(frequency) {
    var days;
    days = ['Mo', 'Tue', 'We', 'Th', 'Fr', 'Sa', 'Su'].filter(function(element, index) {
      return indexOf.call(frequency, index) >= 0;
    });
    if (days.length === 7) {
      days = ['Everyday'];
    }
    return days.join(' ');
  };

  setAlarm = function(alarmNumber, hours, minutes, frequency) {
    var $alarm_card;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    $alarm_card = $($('.alarm_card')[alarmNumber]);
    $alarm_card.find('.time').html(hours + ":" + minutes);
    $alarm_card.find('.frequency').html(getFrequencyText(frequency));
    return Alarms[alarmNumber] = {
      hours: hours,
      minutes: minutes,
      frequency: frequency
    };
  };

  $(function() {
    $('.switcher').on('click', function(e) {
      e.stopPropagation();
      return $(this).toggleClass('on');
    });
    $('.alarm_card').on('click', function() {
      var $day, currentAlarm, hours, minutes;
      $day = $('.day');
      $day.removeClass('active');
      window.currentAlarmNumber = $(this).data('index');
      currentAlarm = Alarms[window.currentAlarmNumber];
      currentAlarm.frequency.forEach(function(value) {
        return $($day[value]).addClass('active');
      });
      hours = currentAlarm.hours;
      if (hours < 10) {
        hours = "0" + hours;
      }
      minutes = currentAlarm.minutes;
      $('.hours .value').text(hours);
      $('.minutes .value').text(minutes);
      $('.alarm_cards').removeClass('shown').addClass('hidden');
      return $('.alarm_change_card_wrapper').removeClass('hidden').addClass('shown');
    });
    $('.day').on('click', function() {
      return $(this).toggleClass('active');
    });
    $('.saving_button').on('click', function() {
      var frequency, hours, minutes;
      $('.alarm_cards').removeClass('hidden').addClass('shown');
      $('.alarm_change_card_wrapper').removeClass('shown').addClass('hidden');
      hours = parseInt($('.hours .value').text());
      minutes = parseInt($('.minutes .value').text());
      frequency = [];
      $('.day').each(function(index, element) {
        if ($(element).hasClass('active')) {
          return frequency.push(index);
        }
      });
      return setAlarm(window.currentAlarmNumber, hours, minutes, frequency);
    });
    $('.hours .up').on('click', function() {
      var newHours;
      newHours = changeTime(parseInt($('.hours .value').text()), 23, 'increase');
      return $('.hours .value').text(newHours);
    });
    $('.hours .down').on('click', function() {
      var newHours;
      newHours = changeTime(parseInt($('.hours .value').text()), 23, 'decrease');
      return $('.hours .value').text(newHours);
    });
    $('.minutes .up').on('click', function() {
      var newMinutes;
      newMinutes = changeTime(parseInt($('.minutes .value').text()), 59, 'increase');
      return $('.minutes .value').text(newMinutes);
    });
    $('.minutes .down').on('click', function() {
      var newMinutes;
      newMinutes = changeTime(parseInt($('.minutes .value').text()), 59, 'decrease');
      return $('.minutes .value').text(newMinutes);
    });
    setAlarm(0, 18, 0, [0, 1, 2, 3, 4, 5, 6]);
    setAlarm(1, 6, 0, [1, 2, 3]);
    return setAlarm(2, 12, 0, [3, 4, 5, 6]);
  });

}).call(this);